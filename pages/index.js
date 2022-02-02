import Header from "../components/layout/Header";
import Slider from "../components/slider/Slider";
import Footer from "../components/layout/Footer";
import Featured from "../components/featured/Featured";
import { getFeatured } from "/lib/db";

function Index(props) {
	return (
		<>
			<Header />
			<Slider />
			<Featured product={props.currency} title="Featured Currencies" />
			<Featured product={props.card} title="Featured Gift Cards" />
			<Footer />
		</>
	);
}

export const getStaticProps = async (ctx) => {
	const featuredCurrency = await getFeatured("currency");
	const featuredCard = await getFeatured("card");

	return {
		props: {
			currency: featuredCurrency.map((fc) => ({
				_id: fc._id.toString(),
				name: fc.name,
				amount: fc.amount,
				price: fc.price,
				image: fc.image,
				details: fc.details,
				type: "currency"
			})),
			card: featuredCard.map((fcr) => ({
				_id: fcr._id.toString(),
				name: fcr.name,
				amount: fcr.amount,
				price: fcr.price,
				image: fcr.image,
				details: fcr.details,
				type: "gift-card"
			}))
		}
	};
};

export default Index;
