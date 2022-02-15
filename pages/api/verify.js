import getClient from "../../lib/db";
import { verifyHash } from "../../lib/auth";

export default async function handler(req, res) {
	if (req.method !== "POST")
		return res.status(500).json({ message: "Something went wrong!" });

	const data = req.body;

	const client = await getClient();
	const db = client.db();

	const storedData = await db
		.collection("users")
		.findOne({ email: data.userEmail });
	const verifyOtp = await verifyHash(data.otp, storedData.otp);

	if (!verifyOtp)
		return res.status(400).json({ message: "Failed to verify Email!" });

	return res.status(201).json({
		message:
			"Your account is verified! You will be redirected to homepage.",
		success: true
	});
}
