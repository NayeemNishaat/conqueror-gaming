import Image from "next/image";

function Slide(props) {
	return (
		<div className="relative w-[100%] h-[87vh]">
			<Image
				priority
				src={props.src}
				alt="Slider Image"
				layout="fill"
			/>
		</div>
	);
}

export default Slide;
