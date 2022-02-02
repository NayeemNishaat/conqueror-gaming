import ProductContext from "../store/ProductContext";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/form/CheckoutForm";
// import "./App.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function App() {
	const [clientSecret, setClientSecret] = useState();
	const context = useContext(ProductContext);

	useEffect(() => {
		fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(context.product)
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [context]);

	if (context.product.payMethod === "bkash")
		return <p>Payment Method is not Supported Yet!</p>;

	const appearance = {
		theme: "stripe"
	};
	const options = {
		clientSecret,
		appearance
	};

	return (
		<section className="App w-screen h-screen flex items-center justify-center">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</section>
	);
}
