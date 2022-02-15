import { hash, compare } from "bcryptjs";
import getClient from "./db";

export default async function createHash(password, salt) {
	return await hash(password, salt);
}

export async function verifyHash(plain, hash) {
	return await compare(plain, hash);
}

export async function verifyLogin(credentials) {
	const client = await getClient();
	const db = client.db();
	const user = await db
		.collection("users")
		.findOne({ email: credentials.email.trim().toLowerCase() });

	if (!user) {
		client.close();
		throw new Error("No User Found");
	}

	const validPassword = await verifyHash(credentials.password, user.password);

	if (!validPassword) {
		client.close();
		throw new Error("Password is Incorrect");
	}
	client.close();
	return { name: user.name, email: user.email };
}
