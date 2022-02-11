let product;

export function setProduct(receivedProduct) {
	product = receivedProduct;
}

export default function getProduct() {
	return product;
}

// Important: Point: Remark: This library function can only be used either in server-side or in client-side.
