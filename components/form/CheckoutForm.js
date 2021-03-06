import React, { useEffect, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements
} from "@stripe/react-stripe-js";
import Link from "next/link";
import { useRouter } from "next/router";
// import useStore from "../../store/store";

export default function CheckoutForm(props) {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	// const [state] = useStore(false);

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage(
						"Your payment was not successful, please try again."
					);
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/success"
			},
			redirect: "if_required"
		});

		if (!error) {
			setIsLoading(false);
			return router.push({
				pathname: "/success",
				search: `?productName=${props.product.name}`
			});
			// return setMessage(
			// 	<p className="my-5 font-semibold text-xl text-green-500">
			// 		Payment Successful
			// 	</p>
			// );
		}

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(
				<p className="my-5 font-semibold text-xl text-red-700">
					{error.message}
				</p>
			);
		} else {
			setMessage(
				<p className="my-5 font-bold text-xl text-red-700">
					Couldn&apos;t Complete Your Payment!
				</p>
			);
		}

		setIsLoading(false);
	};

	return (
		<form id="payment-form" className="my-10" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" />
			<button
				disabled={isLoading || !stripe || !elements}
				id="submit"
				className="btn"
			>
				<span id="button-text">
					{isLoading ? (
						<div className="spinner" id="spinner"></div>
					) : (
						"Pay now"
					)}
				</span>
			</button>
			{message && (
				<div id="payment-message">
					{message}
					<button className="btn bg-red-600">
						<Link href="/">Go Back</Link>
					</button>
				</div>
			)}
		</form>
	);
}
