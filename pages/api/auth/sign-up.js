import getClient from "../../../lib/db";
import createHash from "../../../lib/auth";
import mailer from "../../../lib/mailer";

export default async function handler(req, res) {
	if (req.method !== "POST") return;

	const data = req.body;

	if (!data)
		return res
			.status(422)
			.json({ message: "Sign Up Failed!", redirect: false });

	const client = await getClient();
	const db = client.db();
	const existingUser = await db
		.collection("users")
		.findOne({ email: data.email });

	if (existingUser?.active) {
		client.close;
		return res
			.status(422)
			.json({ message: "User Already Exist!", redirect: false });
	}

	// Important: Sanitizing
	// const email = data.email.trim().toLowerCase();

	// const otp = Math.random(9).toFixed(10).toString().slice(2);

	// Chapter: Sending Email
	const { otp, email } = await mailer("otp", data.email);
	// const smtpTransport = NodeMailer.createTransport({
	// 	service: "Gmail",
	// 	auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD }
	// });

	// const mailOptions = {
	// 	to: data.email,
	// 	subject: "Verify Account",
	// 	html: `Please use <b style="font:20px bold;">${otp}</b> to verify your account!`
	// };

	// try {
	// 	await smtpTransport.sendMail(mailOptions);
	// } catch (err) {
	// 	client.close();
	// 	return res.status(500).json({
	// 		message: "Something went wrong!",
	// 		redirect: false
	// 	});
	// }

	const hashedPassword = await createHash(data.password, 12);
	const hashedOtp = await createHash(otp, 12);

	if (existingUser && !existingUser.active) {
		try {
			await db.collection("users").updateOne(
				{
					email: email
				},
				{
					$set: {
						name: data.name,
						active: false,
						password: hashedPassword,
						otp: hashedOtp
					}
				}
			);

			client.close();
			return res.status(200).json({
				message:
					"Please check your Email in order to activate your account!",
				redirect: "/verify"
			});
		} catch (err) {
			client.close;
			return res
				.status(500)
				.json({
					message:
						"Failed to create accound. Please try sometime later",
					redirect: false
				});
		}
	}

	await db.collection("users").insertOne({
		name: data.name,
		email: email,
		active: false,
		password: hashedPassword,
		otp: hashedOtp
	});

	client.close();
	return res.status(200).json({
		message: "Please check your Email in order to complete the Sign Up!",
		redirect: "/verify"
	});
}
