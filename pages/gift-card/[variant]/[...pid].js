import ProductDetails from "../../../components/product-details/ProductDetails";
import { getSpecificProduct, getPID } from "../../../lib/db";

function GiftCardDetailsContainer(props) {
	return <ProductDetails product={props.product} />;
}

export const getStaticProps = async (ctx) => {
	const [product] = await getSpecificProduct("card", ctx.params.slug);

	return {
		props: {
			product: {
				_id: product._id.toString(),
				name: product.name,
				amount: product.amount,
				price: product.price,
				image: product.image,
				details: product.details
			}
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
