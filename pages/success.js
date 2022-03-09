import useStore from "../store/store";
import { useEffect } from "react";

function Success(props) {
	const state = useStore()[0];

	useEffect(() => {
		fetch("/api/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(state)
		});
	}, []);

	return (
		<div className="text-center text-3xl py-10 flex items-center justify-center text-green-500 font-semibold h-[60vh] bg-gray-300">
			<p>You payment for {props.productName} is successful!</p>
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	const { productName } = ctx.query;

	if (!productName)
		return {
			redirect: {
				destination: "/",
				permanent: true
			}
		};

	return {
		props: {
			productName: productName
		}
	};
};

export default Success;
