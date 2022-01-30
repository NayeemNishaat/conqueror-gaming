import { MongoClient } from "mongodb";

async function getClient() {
	const client = await MongoClient.connect(
		"mongodb+srv://Nayeem:VAfiGViTHlBWDCPg@laby.il75o.mongodb.net/cqg?retryWrites=true&w=majority"
	);

	return client;
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

export default getClient;
