import ProductDetails from "../../../components/product-details/ProductDetails";
import { getSpecificProduct, getFields } from "../../../lib/db";

function currencyDetailsContainer(props) {
	return <ProductDetails product={props.product} />;
}

export const getStaticProps = async (ctx) => {
	const [product] = await getSpecificProduct("currency", ctx.params.pid[0]); // Note: Dynamic catch-all routes are always set and received as an array of dynamic routes!

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

export const getStaticPaths = async (ctx) => {
	const fields = await getFields("currency", "variant");
	const paths = fields.map((field) => ({
		params: {
			variant: field.variant,
			pid: [field._id.toString()] // Warning: If the page name uses catch-all routes then params should contain the array of slug/all-routes([pid,otherId]).
		}
	}));

	return {
		paths: paths,
		fallback: false
	};
};

export default currencyDetailsContainer;
