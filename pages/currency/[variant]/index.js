import { getFields, getProductsOfVariant } from "../../../lib/db";
import CardList from "../../../components/card/CardList";

function CurrencyVarient(props) {
	return (
		<section className="py-10 md:py-20 bg-gray-300">
			<CardList product={props.product} />
		</section>
	);
}

// Error: You can not use getStaticProps or getStaticPaths with getServerSideProps.
export const getStaticProps = async (ctx) => {
	const variant = ctx.params.variant;
	const products = await getProductsOfVariant("currency", variant);

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
				type: "currency"
			}))
		},
		revalidate: 10
	};
};

export const getStaticPaths = async () => {
	const fields = await getFields("currency", "variant");

	const paths = fields.map((field) => ({
		params: {
			variant: field.variant
		}
	}));

	return {
		paths: paths,
		fallback: false
	};
};

export default CurrencyVarient;
