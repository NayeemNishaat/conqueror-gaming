function Success(props) {
	return (
		<div className="text-center text-3xl py-10 flex items-center justify-center text-green-500 font-semibold h-[60vh] bg-gray-300">
			<p>You payment for {props.product} is successful!</p>
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	const { product } = ctx.query;

	if (!product)
		return {
			redirect: {
				destination: "/",
				permanent: true
			}
		};

	return {
		props: {
			product: product
		}
	};
};

export default Success;
