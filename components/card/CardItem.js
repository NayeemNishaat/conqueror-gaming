import Image from "next/image";

function CardItem(props) {
	return (
		<div className="w-[20%]">
			<div className="rounded-lg overflow-hidden shadow-2xl">
				<a href="#null">
					<Image
						src={props.product.image}
						alt={props.product.name}
						layout="responsive" // Important: For removing bottom white-space
						// objectFit="fill" // Remark: Default fill
						width={350}
						height={350}
					/>
				</a>
				<p className="text-center p-3 font-semibold text-amber-600">
					{props.product.name}
				</p>
			</div>
		</div>
	);
}

export default CardItem;
