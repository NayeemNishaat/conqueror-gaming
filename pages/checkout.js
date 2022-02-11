// import ProductContext from "../store/ProductContext";
// import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/form/CheckoutForm";
import { useRouter } from "next/router";
import getProduct from "../lib/store";

const stripePromise = loadStripe(
	"pk_test_51KP2GaB0T1ufhduWZxQFg7NmumKWDQ0Ld74n64aGmPaEqY9lD1MZPp2xnUpe0bsXtwLN3YFFCZkrF3JqMFzQOOG900iBQuIu17"
);

export default function App(props) {
	const [clientSecret, setClientSecret] = useState();
	// const context = useContext(ProductContext);
	const router = useRouter();

	useEffect(() => {
		// if (!context.product) return router.replace("/");
		// if (!props.product) return router.replace("/"); // Important: Can not use outside useEffect() because this page is prerendered in the server. But useRouter is not available in the server. So calling it in client side by placing it insoide useEffect().

		fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(props.product)
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [router, props.product]);

	if (props.product.payMethod === "bkash")
		return (
			<div className="text-center text-3xl py-10 flex items-center justify-center text-red-500 font-semibold h-[60vh] bg-gray-300">
				<p>Pay with {props.product.payMethod} is not supported yet!</p>
			</div>
		);

	const options = {
		clientSecret
	};

	return (
		<section className="App h-screen flex items-center justify-center">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm product={props.product} />
				</Elements>
			)}
		</section>
	);
}

export const getServerSideProps = async (ctx) => {
	const { payMethod } = ctx.query;
	const product = getProduct();

	if (!product)
		return {
			redirect: {
				destination: "/",
				permanent: true
			}
		};

	return {
		props: {
			product: { ...product, payMethod }
		}
	};
};
