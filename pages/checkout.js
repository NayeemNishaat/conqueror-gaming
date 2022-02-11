import ProductContext from "../store/ProductContext";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/form/CheckoutForm";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
	"pk_test_51KP2GaB0T1ufhduWZxQFg7NmumKWDQ0Ld74n64aGmPaEqY9lD1MZPp2xnUpe0bsXtwLN3YFFCZkrF3JqMFzQOOG900iBQuIu17"
);

export default function App() {
	const [clientSecret, setClientSecret] = useState();
	const context = useContext(ProductContext);
	const router = useRouter();

	useEffect(() => {
		if (!context.product) return router.replace("/");

		fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(context.product)
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [context.product, router]);

	if (context.product?.payMethod === "bkash")
		return (
			<div className="text-center text-3xl py-10 flex items-center justify-center text-red-500 font-semibold h-[60vh] bg-gray-300">
				<p>Payment Method is not Supported Yet!</p>
			</div>
		);

	const options = {
		clientSecret
	};

	return (
		<section className="App h-screen flex items-center justify-center">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</section>
	);
}
