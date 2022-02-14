import { getAllProducts } from "../../lib/db";
import CardList from "../../components/card/CardList";

function Currency(props) {
	return (
		<section className="py-10 md:py-20 bg-gray-300">
			<CardList product={props.product} />
		</section>
	);
}

export const getStaticProps = async () => {
	const allCurrency = await getAllProducts("currency");

	return {
		props: {
			product: allCurrency.map((currency) => ({
				_id: currency._id.toString(),
				name: currency.name,
				amount: currency.amount,
				price: currency.price,
				image: currency.image,
				details: currency.details,
				variant: currency.variant,
				type: "currency"
			}))
		},
		revalidate: 10
	};
};

export default Currency;
