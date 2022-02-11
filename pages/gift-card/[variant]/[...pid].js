import ProductDetails from "../../../components/product-details/ProductDetails";
import { getSpecificProduct, getFields } from "../../../lib/db";
import { setProduct } from "../../../lib/store";

function giftCardDetailsContainer(props) {
	return <ProductDetails product={props.product} />;
}

export const getStaticProps = async (ctx) => {
	const [product] = await getSpecificProduct("gift-card", ctx.params.pid[0]);

	setProduct({
		_id: product._id.toString(),
		name: product.name,
		amount: product.amount,
		price: product.price,
		image: product.image,
		details: product.details
	});

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
		},
		revalidate: 10
	};
};

export const getStaticPaths = async (ctx) => {
	const fields = await getFields("gift-card", "variant");
	const paths = fields.map((field) => ({
		params: {
			variant: field.variant,
			pid: [field._id.toString()]
		}
	}));

	return {
		paths: paths,
		fallback: false
	};
};

export default giftCardDetailsContainer;
