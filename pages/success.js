function Success(props) {
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
