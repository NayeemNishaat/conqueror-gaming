// import ProductDetails from "../../../components/product-details/ProductDetails";
// import { getSpecificProduct, getPID } from "../../../lib/db";

function currencyDetailsContainer(props) {
	// return <ProductDetails product={props.product} />;
	return <div>hi</div>;
}

// export const getStaticProps = async (ctx) => {
// 	const [product] = await getSpecificProduct("currency", ctx.params.slug);

// 	return {
// 		props: {
// 			product: {
// 				_id: product._id.toString(),
// 				name: product.name,
// 				amount: product.amount,
// 				price: product.price,
// 				image: product.image,
// 				details: product.details
// 			}
// 		}
// 	};
// };

// export const getStaticPaths = async () => {
// 	const id = await getPID("currency");

// 	const paths = id.map((id) => ({
// 		params: {
// 			slug: id._id.toString()
// 		}
// 	}));

// 	return {
// 		paths: paths,
// 		fallback: false
// 	};
// };

export default currencyDetailsContainer;
