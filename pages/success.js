import useStore from "../store/store";

function Success() {
	const { state } = useStore(false);

	return (
		<div className="text-center text-3xl py-10 flex items-center justify-center text-green-500 font-semibold h-[60vh] bg-gray-300">
			<p>You payment for {state?.product.name} is successful!</p>
		</div>
	);
}

export default Success;
