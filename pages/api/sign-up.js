import getClient from "../../lib/db";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
	if (req.method !== "POST") return;

	const data = req.body;

	if (!data) return res.status(422).json({ message: "Sign Up Failed" });

	const hashedPassword = await hash(data.password, 12);

	const client = await getClient();
	const db = client.db();
	const existingUser = await db
		.collection("users")
		.findOne({ email: data.email });

	if (existingUser) {
		client.close;
		return res.status(422).json({ message: "User Already Exist" });
	}

	await db
		.collection("users")
		.insertOne({ ...data, password: hashedPassword });

	client.close();
	return res.status(201).json({ message: "Sign Up Successful" });
}
