import CardItem from "./CardItem";

function CardList(props) {
	return (
		<div className="flex gap-5 flex-wrap justify-center">
			{props.product.map((p) => (
				<CardItem key={p._id} product={p} />
			))}
		</div>
	);
}

export default CardList;
