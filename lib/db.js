import { MongoClient, ObjectId } from "mongodb";

async function getClient() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.il75o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	);

	return client;
}

export async function getSpecificProduct(collection, id) {
	const client = await getClient();
	const db = client.db();

	const specificProduct = await db
		.collection(collection)
		.find({ _id: ObjectId(id) })
		.toArray();
	client.close();
	return specificProduct;
}

export async function getFeatured(collection) {
	const client = await getClient();
	const db = client.db();

	const featuredCollection = await db
		.collection(collection)
		.find({ featured: true })
		.toArray();

	client.close();
	return featuredCollection;
}

export async function getAllDocuments(collection) {
	const client = await getClient();
	const db = client.db();

	const allDocuments = await db.collection(collection).find().toArray();

	client.close();
	return allDocuments;
}

export async function getPID(collection) {
	const client = await getClient();
	const db = client.db();

	const pId = await db
		.collection(collection)
		.find()
		.project({ _id: 1 })
		.toArray();

	client.close();
	return pId;
}

export default getClient;
