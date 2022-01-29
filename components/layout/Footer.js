function Footer() {
	return (
		<footer className="bg-black py-12">
			<div className="container mx-auto">
				<div className="flex">
					<div className="w-[45%]">
						<ul className="flex text-white text-xl justify-between">
							<li>
								<a className="lnk" href="#null">
									About Us
								</a>
							</li>
							<li>
								<a className="lnk" href="#null">
									Blog
								</a>
							</li>
							<li>
								<a className="lnk" href="#null">
									Press
								</a>
							</li>
							<li>
								<a className="lnk" href="#null">
									Contact
								</a>
							</li>
							<li>
								<a className="lnk" href="#null">
									App
								</a>
							</li>
						</ul>
					</div>
					<div className="w-[55%] flex justify-end gap-3">
						<a href="#null">
							<svg className="w-8 h-8 fill-transparent stroke-white hover:stroke-cyan-500 transition">
								<use xlinkHref="/images/sprite.svg#twitter"></use>
							</svg>
						</a>
						<a href="#null">
							<svg className="w-8 h-8 fill-transparent stroke-white hover:stroke-cyan-500 transition">
								<use xlinkHref="/images/sprite.svg#facebook"></use>
							</svg>
						</a>
						<a href="#null">
							<svg className="w-8 h-8 stroke-white fill-white hover:stroke-cyan-500 transition">
								<use xlinkHref="/images/sprite.svg#instagram"></use>
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
