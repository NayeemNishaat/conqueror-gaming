import ProductContext from "../store/ProductContext";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/form/CheckoutForm";
// import "./App.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function App() {
	const context = useContext(ProductContext);

	const [clientSecret, setClientSecret] = useState();

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

	const appearance = {
		theme: "stripe"
	};
	const options = {
		clientSecret,
		appearance
	};

	return (
		<div className="App">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
