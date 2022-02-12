import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { SessionProvider } from "next-auth/react";
// import { ProductContextProvider } from "../store/ProductContext";
// import configureProductStore from "../store/product-store";

// configureProductStore();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Layout>
				{/* <ProductContextProvider> */}
				<Component {...pageProps} />
				{/* </ProductContextProvider> */}
			</Layout>
		</SessionProvider>
	);
}

export default MyApp;
