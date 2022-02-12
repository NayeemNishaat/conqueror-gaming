import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { SessionProvider } from "next-auth/react";
// import { ProductContextProvider } from "../store/ProductContext";
// import configureProductStore from "../store/product-store";

// configureProductStore();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<Layout>
			{/* <ProductContextProvider> */}
			<Component {...pageProps} />
			{/* </ProductContextProvider> */}
		</Layout>
	);
}

export default MyApp;
