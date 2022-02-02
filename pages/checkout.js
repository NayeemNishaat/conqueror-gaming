import ProductContext from "../store/ProductContext";
import { useContext } from "react";

function Checkout() {
	const context = useContext(ProductContext);

	return (
		<form
			id="payment-form"
			className="w-[30vw] mx-auto shadow-xl rounded-lg p-10"
		>
			<div id="payment-element" className="mb-6"></div>
			<button
				id="submit"
				className="bg-[#5469d4] text-white rounded-md py-3 px-4 font-semibold cursor-pointer block shadow-xl hover:contrast-125 disabled:opacity-50 disabled:cursor-default"
			>
				<div className="spinner hidden" id="spinner"></div>
				<span id="button-text">Pay now</span>
			</button>
			<div id="payment-message" className="hidden text-center"></div>
		</form>
	);
}

export default Checkout;
