import "../styles/globals.css";
import { ProductContextProvider } from "../store/ProductContext";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<ProductContextProvider>
				<Component {...pageProps} />
			</ProductContextProvider>
		</Layout>
	);
}

export default MyApp;
