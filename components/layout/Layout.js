import Header from "./header";
import Footer from "./Footer";

function Layout(props) {
	return (
		<>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</>
	);
}

export default Layout;
