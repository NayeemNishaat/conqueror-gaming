import Stripe from "stripe";

async function handler(req, res) {
	if (req.method !== "POST") return;
	const data = req.body;

	const stripe = new Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

	const verifyAmount = function (data) {
		return +data.amount;
	};

	const paymentIntent = await stripe.paymentIntents.create({
		amount: verifyAmount(data),
		currency: "usd",
		automatic_payment_methods: {
			enabled: true
		}
	});

	res.status(200).json({ clientSecret: paymentIntent.client_secret });
}

export default handler;
