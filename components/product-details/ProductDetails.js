import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import useStore from "../../store/store";
// import { setProduct } from "../../lib/store";
// import { useContext } from "react";
// import ProductContext from "../../store/ProductContext";
// import useStore from "../../store/store";

function ProductDetails(props) {
	const [payMethod, setPayMethod] = useState("bkash");
	const router = useRouter();
	const [_state, dispatch] = useStore();
	const uidRef = useRef();
	const emailRef = useRef();
	const nameRef = useRef();
	// const context = useContext(ProductContext);

	const setPaymentHandler = function (e) {
		setPayMethod(e.target.value);
	};

	const btnClickHandler = function () {
		// context.updateProduct(props.product, payMethod);
		// dispatch("setProduct", { product: props.product, payMethod });

		// fetch("/api/checkout", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(props.product)
		// });

		const uid = uidRef.current.value;
		const email = emailRef.current.value;
		const name = nameRef.current.value;

		dispatch("setOrder", { uid, email });

		router.push({
			pathname: "/checkout",
			search: `?payMethod=${payMethod}`
		});
	};

	return (
		<section className="bg-gray-200 py-10 md:py-20">
			<div className="flex md:flex-row flex-col gap-10 container rounded-xl md:py-20">
				<div className="flex-1 flex flex-col items-center">
					<div>
						<Image
							src={props.product.image}
							alt={props.product.name}
							width={400}
							height={300}
							className="rounded-lg"
							placeholder="blur"
							blurDataURL="/images/common/blur.gif"
						/>
					</div>
					<h2 className="text-2xl font-bold">{props.product.name}</h2>
					<p className="text-lg font-semibold">
						{props.product.details}
					</p>
				</div>

				<div className="flex-1 flex flex-col">
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-5">
							<label
								htmlFor="uid"
								className="text-lg font-semibold w-[55%]"
							>
								Enter UID
							</label>
							<input
								className="bg-gray-200 outline-none rounded-sm ring-1 ring-cyan-400 py-1 px-3 w-full"
								id="uid"
								type="text"
								ref={uidRef}
								required
							/>
						</div>
						<div className="flex items-center gap-5">
							<label
								htmlFor="uid"
								className="text-lg font-semibold w-[55%]"
							>
								Enter UID
							</label>
							<input
								className="bg-gray-200 outline-none rounded-sm ring-1 ring-cyan-400 py-1 px-3 w-full"
								id="uid"
								type="text"
								ref={uidRef}
								required
							/>
						</div>
						<div className="flex items-center gap-5">
							<label
								htmlFor="email"
								className="text-lg font-semibold  w-[55%]"
							>
								Enter Email
							</label>
							<input
								className="bg-gray-200 outline-none rounded-sm ring-1 ring-cyan-400 py-1 px-3 w-full"
								id="email"
								type="email"
								ref={emailRef}
								required
							/>
						</div>
						<div className="flex items-center gap-5">
							<label className="text-lg font-semibold w-24">
								Amount
							</label>
							<span className="text-3xl text-green-500 font-bold">
								{props.product.amount}
							</span>
						</div>
						<div className="flex items-center gap-5">
							<label className="text-lg font-semibold w-24">
								Price
							</label>
							<span className="text-3xl text-orange-600 font-bold">
								{props.product.price}
							</span>
						</div>
					</div>
					<p className="text-lg font-semibold my-5">
						Select Payment Method:
					</p>
					<div className="flex md:flex-row flex-col gap-5 justify-center items-center">
						<figure>
							<input
								type="radio"
								defaultChecked
								name="pay-method"
								id="bkash"
								value="bkash"
								className="peer hidden"
								onChange={setPaymentHandler}
							/>
							<label
								htmlFor="bkash"
								className="flex flex-col items-center peer-checked:ring-2 cursor-pointer peer-checked:ring-rose-600 rounded-xl"
							>
								<svg className="w-40 h-20">
									<use xlinkHref="/images/common/sprite.svg#bkash"></use>
								</svg>
								<figcaption className="text-lg font-semibold">
									bKash
								</figcaption>
							</label>
						</figure>
						<figure>
							<input
								type="radio"
								name="pay-method"
								id="card"
								value="card"
								className="peer hidden"
								onChange={setPaymentHandler}
							/>
							<label
								htmlFor="card"
								className="flex flex-col items-center peer-checked:ring-2 cursor-pointer peer-checked:ring-rose-600 rounded-xl"
							>
								<svg className="w-40 h-20 py-2.5">
									<use xlinkHref="/images/common/sprite.svg#card"></use>
								</svg>
								<figcaption className="text-lg font-semibold">
									Card
								</figcaption>
							</label>
						</figure>
					</div>
					<div className="text-center mt-10">
						<a
							className="bg-[#44d62c] block py-2 px-3 rounded-sm hover:bg-[#71f85c] transition text-xl font-semibold cursor-pointer"
							onClick={btnClickHandler}
						>
							Checkout
						</a>
					</div>
				</div>
				{/* <div className="relative">
					<div className="absolute top-0 left-0 -z-10 w-full h-full">
						<Image
							src={props.product.image}
							alt={props.product.name}
							layout="fill"
						/>
					</div>
					<div className="z-10">
						Some overlay things go in here
					</div>
				</div>
				// Remark: Way to set BG Image
				*/}
			</div>
		</section>
	);
}

export default ProductDetails;
