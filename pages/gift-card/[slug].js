import ProductDetails from "../../components/product-details/ProductDetails";
import { getSpecificProduct, getPID } from "../../lib/db";

function GiftCardDetailsContainer() {
	return <ProductDetails />;
}

export const getStaticProps = async (ctx) => {
	const product = await getSpecificProduct("card", ctx.params.slug);

	return {
		props: {
			product: product.map((p) => ({
				_id: p._id.toString(),
				name: p.name,
				amount: p.amount,
				price: p.price,
				image: p.price,
				details: p.details
			}))
		}
	};
};

export const getStaticPaths = async () => {
	const id = await getPID("card");

	const paths = id.map((id) => ({
		params: {
			slug: id._id.toString()
		}
	}));

	return {
		paths: paths,
		fallback: false
	};
};

export default GiftCardDetailsContainer;
