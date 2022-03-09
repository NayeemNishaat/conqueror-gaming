import NodeMailer from "nodemailer";

export default async function mailer(type, email, data) {
	// Important: Sanitizing
	const sanitizedEmail = email.trim().toLowerCase();

	const smtpTransport = NodeMailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD
		}
	});

	let mailOptions;
	let otp;
	if (type === "otp") {
		otp = Math.random(9).toFixed(10).toString().slice(2);

		mailOptions = {
			to: sanitizedEmail,
			subject: "Verify Account",
			html: `Please use <b style="font:20px bold;">${otp}</b> to verify your account!`
		};
	} else {
		mailOptions = {
			to: `${sanitizedEmail},mdsaymon944@gmail.com`,
			subject: "Order Details",
			html: `Product Name: ${data.name}<br/>Amount: ${data.amount}<br/>Price: ${data.price}<br/>Email: ${data.email}<br/>Name: ${data.userName}<br/>UID: ${data.uid}`
		};
	}

	try {
		await smtpTransport.sendMail(mailOptions);
		return { otp, email: sanitizedEmail };
	} catch (err) {
		client.close();
		return res.status(500).json({
			message: "Something went wrong!",
			redirect: false
		});
	}
}
