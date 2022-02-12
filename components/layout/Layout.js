import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

function Layout(props) {
	return (
		<>
			<Head>
				<title>Conqueror Gaming</title>
				<meta
					name="description"
					content="Buy game currencies (PUBG - UC, Free Fire - Diamond, COD - CP etc.) at a reasonable price."
				/>
			</Head>
			<Header />
			<main>{props.children}</main>
			<Footer />
		</>
	);
}

export default Layout;
