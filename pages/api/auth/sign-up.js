import getClient from "../../../lib/db";
import createHash from "../../../lib/auth";

export default async function handler(req, res) {
	if (req.method !== "POST") return;

	const data = req.body;

	if (!data)
		return res
			.status(422)
			.json({ message: "Sign Up Failed!", redirect: "/" });

	const hashedPassword = await createHash(data.password, 12);

	const client = await getClient();
	const db = client.db();
	const existingUser = await db
		.collection("users")
		.findOne({ email: data.email });

	if (existingUser?.active) {
		client.close;
		return res
			.status(422)
			.json({ message: "User Already Exist!", redirect: "/" });
	}

	// Important: Sanitizing
	const email = data.email.trim().toLowerCase();

	const otp = Math.random(9).toFixed(10).toString().slice(2);
	const hashedOtp = await createHash(otp, 12);

	await db.collection("users").insertOne({
		name: data.name,
		email: email,
		active: false,
		password: hashedPassword,
		otp: hashedOtp
	});

	client.close();
	return res.status(201).json({
		message: "Please check your Email in order to complete the Sign Up!",
		redirect: "/verify"
	});
}
