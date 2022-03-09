import ProductDetails from "../../../components/product-details/ProductDetails";
import { getSpecificProduct, getFields } from "../../../lib/db";
import useStore from "../../../store/store";
import { useEffect } from "react";
// import { setProduct } from "../../../lib/store";

function CurrencyDetailsContainer(props) {
	const [_stat, dispatch] = useStore();

	useEffect(() => {
		dispatch("setProduct", props.product);
	}, [dispatch, props.product]);

	return <ProductDetails product={props.product} />;
}

export const getStaticProps = async (ctx) => {
	const [product] = await getSpecificProduct("currency", ctx.params.pid[0]); // Note: Dynamic catch-all routes are always set and received as an array of dynamic routes!

	// setProduct({
	// 	_id: product._id.toString(),
	// 	name: product.name,
	// 	amount: product.amount,
	// 	price: product.price,
	// 	image: product.image,
	// 	details: product.details
	// });

	// Remark: Fetch inside getStaticProps()
	// fetch("http://localhost:3000/api/product", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	},
	// 	body: JSON.stringify({
	// 		product: {
	// 			_id: product._id.toString(),
	// 			name: product.name,
	// 			amount: product.amount,
	// 			price: product.price,
	// 			image: product.image,
	// 			details: product.details
	// 		}
	// 	})
	// });

	return {
		props: {
			product: {
				_id: product._id.toString(),
				name: product.name,
				amount: product.amount,
				price: product.price,
				image: product.image,
				details: product.details
			}
		},
		revalidate: 10
	};
};

export const getStaticPaths = async () => {
	const fields = await getFields("currency", "variant");
	const paths = fields.map((field) => ({
		params: {
			variant: field.variant,
			pid: [field._id.toString()] // Warning: If the page name uses catch-all routes then params should contain the array of slug/all-routes([pid,otherId]).
		}
	}));

	return {
		paths: paths,
		fallback: false
	};
};

export default CurrencyDetailsContainer;
