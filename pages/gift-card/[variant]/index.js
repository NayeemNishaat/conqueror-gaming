import { getVariant, getProductsOfVariant } from "../../../lib/db";
import CardList from "../../../components/card/CardList";

function CurrencyVarient(props) {
	return (
		<section className="py-20 bg-gray-300">
			<CardList product={props.product} />
		</section>
	);
}

export const getStaticProps = async (ctx) => {
	const variant = ctx.params.variant;
	const products = await getProductsOfVariant("gift-card", variant);

	return {
		props: {
			product: products.map((product) => ({
				_id: product._id.toString(),
				name: product.name,
				amount: product.amount,
				price: product.price,
				image: product.image,
				details: product.details,
				variant: product.variant,
				type: "gift-card"
			}))
		}
	};
};

export const getStaticPaths = async () => {
	const variant = await getVariant("gift-card");

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
