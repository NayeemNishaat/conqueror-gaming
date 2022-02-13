// Important: Point: Remark: This library function can only be used either in server-side or in client-side.

let product;

export default function getProduct() {
	return product;
}

export function setProduct(receivedProduct) {
	product = receivedProduct;
}
