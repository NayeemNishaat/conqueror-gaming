import CardList from "../card/CardList";

function Featured(props) {
	return (
		<section className="bg-gray-300 lg:py-20 last:pt-0 py-10">
			<div className="container">
				<h2 className="md:text-4xl text-3xl text-violet-700 text-center font-bold md:mb-10 mb-5">
					{props.title}
				</h2>
				<CardList product={props.product} />
			</div>
		</section>
	);
}

export default Featured;
