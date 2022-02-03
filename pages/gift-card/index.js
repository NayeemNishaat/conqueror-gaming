import { getAllDocuments } from "../../lib/db";
import CardList from "../../components/card/CardList";

function GiftCard(props) {
	return (
		<section className="py-20 bg-gray-300">
			<CardList product={props.product} />
		</section>
	);
}

export const getStaticProps = async () => {
	const allCard = await getAllDocuments("card");
	return {
		props: {
			product: allCard.map((card) => ({
				_id: card._id.toString(),
				name: card.name,
				amount: card.amount,
				price: card.price,
				image: card.image,
				details: card.details,
				type: "gift-card"
			}))
		}
	};
};

export default GiftCard;
