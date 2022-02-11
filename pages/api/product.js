// Important: Note: Must export as default else will throw Error: TypeError - resolver is not a function
export default async function Handler(req, res) {
	const data = req.body;
	console.log(data);
	res.status(200).json({ message: "ok" }); // Important: Must send a response to resolve the promise!
}
