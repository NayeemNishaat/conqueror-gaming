import getClient from "../../../lib/db";
import createHash from "../../../lib/auth";
import NodeMailer from "nodemailer";

export default async function handler(req, res) {
	if (req.method !== "POST") return;

	const data = req.body;

	if (!data)
		return res
			.status(422)
			.json({ message: "Sign Up Failed!", redirect: false });

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
			.json({ message: "User Already Exist!", redirect: false });
	}

	// Important: Sanitizing
	const email = data.email.trim().toLowerCase();

	const otp = Math.random(9).toFixed(10).toString().slice(2);

	// Chapter: Configuring Email
	const smtpTransport = NodeMailer.createTransport({
		service: "Gmail",
		auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD }
	});

	const mailOptions = {
		to: data.email,
		subject: "Verify Account",
		html: `Please use <b style="font:20px bold;">${otp}</b> to verify your account!`
	};

	let sendMail = true;
	smtpTransport.sendMail(mailOptions, (error) => {
		if (error) {
			sendMail = false;
		}
	});
	console.log(sendMail);
	if (!sendMail) {
		client.close();
		return res.status(500).json({
			message: "Something went wrong!",
			redirect: false
		});
	}

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
