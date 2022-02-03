import Stripe from "stripe";

async function handler(req, res) {
	if (req.method !== "POST") return;
	const data = req.body;

	const stripe = new Stripe(
		"sk_test_51KP2GaB0T1ufhduW88MVM6tNbFqgv0NEernlllRQf1VS6igAWZRnZk8rsbydWXye93x6fBFQu86d9bY3fV5GHwtL00dONLU12t"
	);

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
