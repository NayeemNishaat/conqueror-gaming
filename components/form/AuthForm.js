import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function AuthForm(props) {
	const [name, setName] = useState({ name: "", typed: false });
	const [email, setEmail] = useState({ email: "", typed: false });
	const [password, setPassword] = useState({ password: "", typed: false });
	const [result, setResult] = useState("");
	const router = useRouter();

	useEffect(() => {
		return () => {
			setName({ name: "", typed: false });
			setEmail({ email: "", typed: false });
			setPassword({ password: "", typed: false });
		};
	}, [props.type]); // Important: Note: Pretty clever!

	const changeHandler = (e) => {
		if (e.target.id === "name")
			setName({ name: e.target.value, typed: true });
		if (e.target.id === "email")
			setEmail({ email: e.target.value, typed: true });
		if (e.target.id === "password")
			setPassword({ password: e.target.value, typed: true });
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		setResult("Trying to Sign You In...");

		const postActions = (result, redirect = true) => {
			setResult(result);

			setTimeout(() => {
				setResult("");
				if (redirect) router.replace(redirect);
			}, 2000);

			setName({ name: "", typed: false });
			setEmail({ email: "", typed: false });
			setPassword({ password: "", typed: false });
		};

		if (props.type === "sign-up") {
			const response = await fetch("/api/auth/sign-up", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: name.name,
					email: email.email,
					password: password.password
				})
			});

			document.cookie = `userEmail=${email.email}`;

			const { message: result, redirect } = await response.json();
			postActions(result, redirect);
		}

		if (props.type === "sign-in") {
			// Important: signIn should have the first param "credentials" in order to tell nextauth that the authorization is credentials based!
			const res = await signIn("credentials", {
				redirect: false, // Point: Auto redirect disabled so that we can check if any error occurs or not, cause this promise always resolved.
				email: email.email,
				password: password.password
			});

			if (!res.error) {
				postActions(
					"Sign In Successful! You will be Redirected to Homepage."
				);
			} else postActions("Sign In Failed!", false);
			// Note: I could show the specific error message by using res.error! But that's bad for security purposes!
		}
	};

	// Part: Sign Up UI
	const formattedText = props.type
		.split("-")
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join(" ");

	let inputName;
	if (formattedText === "Sign Up")
		inputName = (
			<div className="mb-2">
				<label
					htmlFor="name"
					className="block text-white font-bold mb-2"
				>
					Your Name
				</label>
				<input
					type="text"
					id="name"
					required
					className="bg-[#f1e1fc] text-[#38015c] rounded border border-white w-full text-left p-1"
					value={name.name}
					onChange={changeHandler}
				/>
			</div>
		);
	else inputName = "";

	// Part: Validation
	const data = [{ ...name }, { ...email }, { ...password }];
	let valid = true;

	data.forEach((ob) => {
		for (const key in ob) {
			valid = ob[key].trim?.() !== "";
			if (key === "name")
				props.type === "sign-in" ? (valid = true) : null;

			if (key === "email")
				valid = ob[key].trim?.().match(/.+@.+\..+/) !== null;

			if (key !== "typed") ob[key] = valid;
		}
	});

	const invalidType = data.filter((ob) => {
		for (const key in ob) {
			return !ob[key];
		}
	});

	const message = invalidType.map((ob) => {
		for (const key in ob) {
			valid = ob[key] && valid;
			if (ob.typed)
				return (
					<p
						key={key}
						className="text-[#ff0038] font-semibold text-xl"
					>
						{key[0].toUpperCase() + key.slice(1)} is Invalid!
					</p>
				);
		}
	});

	return (
		<section className="mx-auto my-12 w-[95%] max-w-[25rem] rounded-md bg-[#38015c] shadow-xl p-4 text-center">
			<h1 className="text-center text-3xl mb-4 text-white">
				{formattedText}
			</h1>
			<form onSubmit={submitHandler} method="POST">
				{inputName}
				<div className="mb-2">
					<label
						htmlFor="email"
						className="block text-white font-bold mb-2"
					>
						Your Email
					</label>
					<input
						type="email"
						id="email"
						required
						className="bg-[#f1e1fc] text-[#38015c] rounded border border-white w-full text-left p-1"
						value={email.email}
						onChange={changeHandler}
					/>
				</div>
				<div className="mb-2">
					<label
						htmlFor="password"
						className="block text-white font-bold mb-2"
					>
						Your Password
					</label>
					<input
						type="password"
						id="password"
						required
						className="bg-[#f1e1fc] text-[#38015c] rounded border border-white w-full text-left p-1"
						value={password.password}
						onChange={changeHandler}
					/>
				</div>
				<div className="mt-6">{message}</div>
				<div className="mt-6 text-[#ff0038] font-semibold text-xl">
					{result}
				</div>
				<div className="mt-6">
					<button
						disabled={!valid}
						className="btn mx-auto text-white w-auto cursor-pointer bg-[#9f5ccc] rounded border border-[#9f5ccc] py-2 px-10 hover:bg-[#873abb] hover:border-[#873abb] disabled:bg-gray-600 disabled:pointer-events-none"
					>
						{formattedText}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;
