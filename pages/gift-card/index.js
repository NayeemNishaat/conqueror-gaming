import { getAllProducts } from "../../lib/db";
import CardList from "../../components/card/CardList";

function GiftCard(props) {
	return (
		<section className="py-10 md:py-20 bg-gray-300">
			<CardList product={props.product} />
		</section>
	);
}

export const getStaticProps = async () => {
	const giftCards = await getAllProducts("gift-card");
	return {
		props: {
			product: giftCards.map((giftCard) => ({
				_id: giftCard._id.toString(),
				name: giftCard.name,
				amount: giftCard.amount,
				price: giftCard.price,
				image: giftCard.image,
				details: giftCard.details,
				variant: giftCard.variant,
				type: "gift-card"
			}))
		},
		revalidate: 10
	};
};

export default GiftCard;
