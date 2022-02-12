import { useState } from "react";

function AuthForm(props) {
	const [name, setName] = useState({ name: "", typed: false });
	const [email, setEmail] = useState({ email: "", typed: false });
	const [password, setPassword] = useState({ password: "", typed: false });

	const changeHandler = (e) => {
		if (e.target.id === "name")
			setName({ name: e.target.value, typed: true });
		if (e.target.id === "email")
			setEmail({ email: e.target.value, typed: true });
		if (e.target.id === "password")
			setPassword({ password: e.target.value, typed: true });
	};

	const submitHandler = (e) => {
		e.preventDefault();
	};

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

	const data = [{ ...name }, { ...email }, { ...password }];
	let valid = true;

	data.forEach((ob) => {
		for (const key in ob) {
			valid = ob[key].trim?.() !== "";
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
			<form onSubmit={submitHandler}>
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
				<div className="mt-6">
					<button
						disabled={!valid}
						className="mx-auto text-white w-auto cursor-pointer bg-[#9f5ccc] rounded border border-[#9f5ccc] py-2 px-10 hover:bg-[#873abb] hover:border-[#873abb] disabled:bg-gray-600 disabled:pointer-events-none"
					>
						{formattedText}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;
