import Header from "../components/layout/Header";
import Slider from "../components/slider/Slider";
import Footer from "../components/layout/Footer";
import Featured from "../components/featured/Featured";

function index() {
	return (
		<>
			<Header />
			<Slider />
			<Featured />
			<Footer />
		</>
	);
}

export default index;
