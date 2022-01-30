import CardList from "../card/CardList";

function Featured(props) {
	return (
		<section className="bg-gray-300 py-20">
			<div className="container mx-auto">
				<h2 className="text-4xl text-violet-700 text-center font-bold mb-10">
					{props.title}
				</h2>
				<CardList product={props.product} />
			</div>
		</section>
	);
}

export default Featured;
