import { hash, compare } from "bcryptjs";
import getClient from "./db";

export default async function hashPassword(password, salt) {
	return await hash(password, salt);
}

async function verifyPassword(password, hashedPassword) {
	return await compare(password, hashedPassword);
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

	const validPassword = await verifyPassword(
		credentials.password,
		user.password
	);

	if (!validPassword) {
		client.close();
		throw new Error("Password is Incorrect");
	}

	client.close();
	return { email: user.email };
}
