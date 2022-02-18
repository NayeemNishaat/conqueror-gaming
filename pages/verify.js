import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

function Verify() {
	const [value, setValue] = useState("");
	const [message, setMessage] = useState("");
	const [cookie, setCookie] = useState(null);
	const otpRef = useRef();
	const router = useRouter();

	useEffect(() => {
		const cookie = document.cookie
			.split("; ")
			.map((ck) => ck.split("="))
			.filter((arr) => arr[0] === "userEmail")
			.flat();
		setCookie(cookie);

		// return () => cookie.length && router.replace("/");
	}, [router]);

	const submitHandler = (e) => {
		e.preventDefault();

		setMessage("Loading...");

		const userEmail = cookie[1];
		const otp = otpRef.current.value;
		console.log(userEmail, otp);

		fetch("/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userEmail, otp })
		})
			.then((res) => res.json())
			.then((data) => {
				setMessage(data.message);

				if (data.success) {
					document.cookie = "userEmail=; Max-Age=0";
					router.replace("/");
				}
			});
	};

	const changeHandler = (e) => setValue(e.target.value);

	if (cookie === null)
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<div className="atom-spinner">
					<div className="spinner-inner">
						<div className="spinner-line"></div>
						<div className="spinner-line"></div>
						<div className="spinner-line"></div>
						<div className="spinner-circle">&#9679;</div>
					</div>
				</div>
				<p className="text-3xl font-semibold text-green-500">Loading</p>
			</div>
		);
	if (!cookie.length) {
		router.replace("/");
		return (
			<div className="flex flex-col items-center justify-center h-[50vh]">
				<div className="atom-spinner">
					<div className="spinner-inner">
						<div className="spinner-line"></div>
						<div className="spinner-line"></div>
						<div className="spinner-line"></div>
						<div className="spinner-circle">&#9679;</div>
					</div>
				</div>
				<p className="text-3xl font-semibold text-green-500">
					Invalid Request! Redirecting to homepage!
				</p>
			</div>
		);
	}

	return (
		<section className="mx-auto my-20 w-[95%] max-w-[25rem] rounded-md bg-[#38015c] shadow-xl p-4 text-center">
			<h1 className="text-center text-3xl mb-4 text-white">
				Enter the OTP
			</h1>
			<form onSubmit={submitHandler} method="POST">
				<div className="mb-2">
					<input
						type="password"
						id="otp"
						required
						className="bg-[#f1e1fc] text-[#38015c] rounded border border-white w-full text-left p-1"
						value={value}
						ref={otpRef}
						onChange={changeHandler}
					/>
				</div>
				<div className="mt-6 text-[#ff0038] font-semibold text-xl">
					{message}
				</div>
				<div className="mt-6">
					<button
						disabled={!value}
						className="btn mx-auto text-white w-auto cursor-pointer bg-[#9f5ccc] rounded border border-[#9f5ccc] py-2 px-10 hover:bg-[#873abb] hover:border-[#873abb] disabled:bg-gray-600 disabled:pointer-events-none"
					>
						Submit
					</button>
				</div>
			</form>
		</section>
	);
}

export default Verify;
