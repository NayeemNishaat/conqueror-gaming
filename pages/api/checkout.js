function handler(req, res) {
	if (req.method !== "POST") return;
	data = req.body;

	// const paymentIntent = await stripe.paymentIntents.create({
	// 	amount: calculateOrderAmount(items),
	// 	currency: "eur",
	// 	automatic_payment_methods: {
	// 	  enabled: true,
	// 	},
	//   });
}

export default handler;
