import Image from "next/image";
import Link from "next/link";

function CardItem(props) {
	return (
		<div className="lg:w-[20%] md:w-[40%] w-full">
			<div className="rounded-lg overflow-hidden shadow-2xl">
				<Link
					href={`/${props.product.type}/${props.product.variant}/${props.product._id}`}
				>
					<a>
						<Image
							src={props.product.image}
							alt={props.product.name}
							layout="responsive" // Important: For removing bottom white-space
							// objectFit="fill" // Remark: Default fill
							width={350}
							height={350}
							placeholder="blur"
							blurDataURL="/images/common/blur.gif"
						/>
						<p className="text-center p-3 font-semibold text-amber-600">
							{props.product.name}
						</p>
					</a>
				</Link>
			</div>
		</div>
	);
}

export default CardItem;
