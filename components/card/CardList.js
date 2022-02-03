import CardItem from "./CardItem";

function CardList(props) {
	return (
		<div className="flex lg:gap-8 md:gap-12 gap-10 flex-wrap justify-center">
			{props.product.map((p) => (
				<CardItem key={p._id} product={p} />
			))}
		</div>
	);
}

export default CardList;
