import getClient from "../../lib/db";
import mailer from "../../lib/mailer.js";

export default async function handler(req, res) {
	if (req.method !== "POST") return;
	const data = req.body;

	if (!data) return res.status(422).json({ message: "No data received!" });

	await mailer("order", data.email, data);

	let client;
	try {
		client = await getClient();
		if (!client) return res.status(500).send("Failed to connect with DB.");

		const db = client.db();
		await db.collection("orders").insertOne(data);
		client.close();
		return res
			.status(200)
			.json({ message: "Order is stored successfully!" });
	} catch (err) {
		client.close();
		return res.status(500).send("Something went wrong!");
	}
}
