import { MongoClient, ObjectId } from "mongodb";

async function getClient() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.il75o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	);

	return client;
}

export async function getSpecificProduct(collection, id) {
	const client = await getClient();
	const db = client.db("cqg");

	const specificProduct = await db
		.collection(collection)
		.find({ _id: ObjectId(id) })
		.toArray();
	client.close();
	return specificProduct;
}

export async function getProductsOfVariant(collection, variant) {
	const client = await getClient();
	const db = client.db();

	const productsOfVariant = await db
		.collection(collection)
		.find({ variant: variant })
		.toArray();

	client.close();
	return productsOfVariant;
}

export async function getFeaturedProducts(collection) {
	const client = await getClient();
	const db = client.db();

	const featuredProducts = await db
		.collection(collection)
		.find({ featured: true })
		.toArray();

	client.close();
	return featuredProducts;
}

export async function getAllProducts(collection) {
	const client = await getClient();
	const db = client.db();

	const allProducts = await db.collection(collection).find().toArray();

	client.close();
	return allProducts;
}

export async function getFields(collection, field = "_id") {
	const client = await getClient();
	const db = client.db();

	const fields = await db
		.collection(collection)
		.find()
		.project({ [field]: 1 })
		.toArray();

	client.close();
	return fields;
}

export default getClient;
