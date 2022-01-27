function Footer() {
	return (
		<footer className="bg-black py-12">
			<div className="container mx-auto">
				<div className="flow-root">
					<div className="flex-1">
						<ul className="flex text-white text-xl justify-evenly">
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
					<div className="flex-1"></div>
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
