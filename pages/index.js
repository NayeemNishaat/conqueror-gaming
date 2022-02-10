import Slider from "../components/slider/Slider";
import Featured from "../components/featured/Featured";
import { getFeaturedProducts } from "/lib/db";
import configureProductStore from "../store/product-store";

configureProductStore();

function Index(props) {
	return (
		<>
			<Slider />
			<Featured product={props.currency} title="Featured Currencies" />
			<Featured product={props.card} title="Featured Gift Cards" />
		</>
	);
}

export const getStaticProps = async () => {
	const featuredCurrency = await getFeaturedProducts("currency");
	const featuredCard = await getFeaturedProducts("gift-card");

	return {
		props: {
			currency: featuredCurrency.map((fc) => ({
				_id: fc._id.toString(),
				name: fc.name,
				amount: fc.amount,
				price: fc.price,
				image: fc.image,
				details: fc.details,
				variant: fc.variant,
				type: "currency"
			})),
			card: featuredCard.map((fcr) => ({
				_id: fcr._id.toString(),
				name: fcr.name,
				amount: fcr.amount,
				price: fcr.price,
				image: fcr.image,
				details: fcr.details,
				variant: fcr.variant,
				type: "gift-card"
			}))
		},
		revalidate: 10
	};
};

export default Index;
