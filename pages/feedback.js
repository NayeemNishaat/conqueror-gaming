import { useRef, useState } from "react";

function Feedback() {
	const [message, setMessage] = useState("");

	const nameRef = useRef();
	const emailRef = useRef();
	const messageRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		const checkValidity = (value, rules) => {
			let isValid = true;

			if (rules.type === "email") {
				const regExp = new RegExp(
					/^[a-zA-Z0-9\W|_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/
				);

				isValid = regExp.test(value.trim()) === true && isValid;
			}

			if (rules.required) {
				isValid = value.trim() !== "" && isValid;
			}

			return isValid;
		};

		let isValid = true;
		const name = nameRef.current.value;
		isValid = checkValidity(name, { type: "text", required: true });

		if (!isValid)
			return setMessage(
				<p className="mt-5 text-red-600 font-semibold text-center transition-all">
					Please insert a name!
				</p>
			);

		const email = emailRef.current.value;

		isValid = checkValidity(email, { type: "email", required: true });

		if (!isValid)
			return setMessage(
				<p className="mt-5 text-red-600 font-semibold text-center">
					Invalid Email!
				</p>
			);

		const message = messageRef.current.value;

		isValid = checkValidity(message, { type: "textarea", required: true });

		if (!isValid)
			return setMessage(
				<p className="mt-5 text-red-600 font-semibold text-center">
					Message cannot be empty!
				</p>
			);

		nameRef.current.value = "";
		emailRef.current.value = "";
		messageRef.current.value = "";

		setMessage(
			<p className="mt-5 text-green-600 font-semibold text-center">
				We have received your feedback!
			</p>
		);

		fetch("/api/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, email, message })
		});

		setTimeout(() => setMessage(""), 3000);
	};

	return (
		<section className="bg-gray-300 py-20">
			<div className="container">
				<form
					onSubmit={handleSubmit}
					className="mx-auto w-full sm:w-4/5 lg:w-1/2 shadow-2xl p-5 md:p-10 rounded-xl"
				>
					<div className="flex flex-col gap-5 xl:w-[90%] mx-auto text-xl">
						<p className="text-center">
							Pleae share your feedback/suggestions with us!
						</p>
						<div className="flex gap-3 sm:gap-5 items-center">
							<label htmlFor="name" className="w-1/3 sm:w-1/4">
								Name
							</label>
							<input
								id="name"
								type="text"
								name="name"
								className="outline-none rounded-sm w-2/3 sm:flex-1 p-1.5"
								ref={nameRef}
							/>
						</div>
						<div className="flex gap-3 sm:gap-5 items-center">
							<label htmlFor="email" className="w-1/3 sm:w-1/4">
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								className="outline-none rounded-sm w-2/3 sm:flex-1 p-1.5"
								ref={emailRef}
							/>
						</div>
						<div className="flex gap-3 sm:gap-5 items-center">
							<label htmlFor="message" className="w-1/3 sm:w-1/4">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								className="outline-none rounded-sm resize w-2/3 sm:flex-1"
								rows="3"
								ref={messageRef}
							/>
						</div>
						{message}
						<input
							type="submit"
							value="Submit"
							className="p-2 bg-purple-700 rounded-sm mt-5 text-white hover:bg-purple-900 cursor-pointer transition"
						/>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Feedback;
