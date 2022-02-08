function Footer() {
	return (
		<footer className="bg-black py-12">
			<div className="container">
				<div className="flex md:flex-row flex-col items-center md:items-stretch gap-8 md:gap-0">
					<div className="md:w-[55%]">
						<ul className="flex text-white text-xl md:justify-between justify-center gap-5 flex-wrap">
							<li>
								<a className="lnk" href="#null">
									About Us
								</a>
							</li>
							<li>
								<a className="lnk" href="#null">
									Contact
								</a>
							</li>
							<li>
								<a className="lnk" href="#">
									Privacy Policy
								</a>
							</li>
							<li>
								<a className="lnk" href="#">
									Terms and Conditions
								</a>
							</li>
						</ul>
					</div>
					<div className="md:w-[45%] flex justify-end gap-3">
						<a href="#null">
							<svg className="w-8 h-8 fill-transparent stroke-white hover:stroke-cyan-500 transition">
								<use xlinkHref="/images/common/sprite.svg#twitter"></use>
							</svg>
						</a>
						<a href="#null">
							<svg className="w-8 h-8 fill-transparent stroke-white hover:stroke-cyan-500 transition">
								<use xlinkHref="/images/common/sprite.svg#facebook"></use>
							</svg>
						</a>
						<a href="#null">
							<svg className="w-8 h-8 stroke-white fill-white hover:stroke-cyan-500 transition">
								<use xlinkHref="/images/common/sprite.svg#instagram"></use>
							</svg>
						</a>
					</div>
				</div>
				<div className="text-center mt-10">
					<p className="text-[#9b59b6] font-semibold text-lg">
						&copy; Nayeem
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
