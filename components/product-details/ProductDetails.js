function ProductDetails() {
	return <div>Enter</div>;
}

export const getStaticProps = async (ctx) => {
	console.log(45);
	return {
		props: {
			data: null
		}
	};
};

export default ProductDetails;
