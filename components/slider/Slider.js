import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Slide from "./Slide";

function Slider() {
	return (
		<section>
			<Swiper
				modules={[Autoplay]}
				autoplay={{ delay: 5000 }}
				loop={true}
			>
				<SwiperSlide>
					<Slide src="/images/homepage/slider/img-1.jpg" />
				</SwiperSlide>
				<SwiperSlide>
					<Slide src="/images/homepage/slider/img-2.jpg" />
				</SwiperSlide>
				<SwiperSlide>
					<Slide src="/images/homepage/slider/img-3.jpg" />
				</SwiperSlide>
			</Swiper>
		</section>
	);
}

export default Slider;
