import getClient from "../../lib/db";
import { verifyHash } from "../../lib/auth";

export default async function handler(req, res) {
	if (req.method !== "POST")
		return res.status(500).json({ message: "Something went wrong!" });

	const data = req.body;

	const client = await getClient();
	const db = client.db();

	const email = data.userEmail.trim().toLowerCase();

	const storedData = await db.collection("users").findOne({ email: email });

	if (!storedData)
		return res
			.status(400)
			.json({ message: "Verification failed! Please try again!" });

	const verifyOtp = await verifyHash(data.otp, storedData.otp);

	if (!verifyOtp) {
		client.close();
		return res.status(400).json({ message: "Failed to verify Email!" });
	}

	// Todo: Remove otp
	await db
		.collection("users")
		.updateOne(
			{ email: email },
			{ $unset: { otp: 1 }, $set: { active: true } }
		);

	// Todo: Set active to true

	client.close();
	return res.status(201).json({
		message:
			"Your account is verified! You will be redirected to homepage.",
		success: true
	});
}
