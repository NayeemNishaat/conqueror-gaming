import { getVariant } from "../../../lib/db";

function CurrencyVarient() {
	return <div>Enter</div>;
}

// Error: You can not use getStaticProps or getStaticPaths with getServerSideProps.

export const getStaticProps = async (ctx) => {
	const variant = ctx.params.variant;

	return {
		props: {
			data: null
		}
	};
};

export const getStaticPaths = async () => {
	const variant = await getVariant("currency");

	const paths = variant.map((vrint) => ({
		params: {
			variant: vrint.variant
		}
	}));

	return {
		paths: paths,
		fallback: false
	};
};

export default CurrencyVarient;
