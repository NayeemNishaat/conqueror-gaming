import { createContext, useState } from "react";

const ProductContext = createContext({
	product: {},
	updateProduct: function (product, payMethod) {
		return { ...product, payMethod };
	}
});

export function ProductContextProvider(props) {
	const [product, setProduct] = useState(null);

	const updateProductHandler = function (product, payMethod) {
		setProduct({ ...product, payMethod });
	};

	const context = {
		product,
		updateProduct: updateProductHandler
	};

	return (
		<ProductContext.Provider value={context}>
			{props.children}
		</ProductContext.Provider>
	);
}

export default ProductContext;
