import { MongoClient, ObjectId } from "mongodb";

async function getClient() {
	const client = await MongoClient.connect(
		"mongodb+srv://Nayeem:VAfiGViTHlBWDCPg@laby.il75o.mongodb.net/cqg?retryWrites=true&w=majority"
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
