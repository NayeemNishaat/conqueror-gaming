import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Header() {
	const [currEl, setCurrEl] = useState(null);

	function setSubMenuHeightHandler(e) {
		if (screen.width > 800) return;

		document.querySelectorAll(".js__sub-menu").forEach((el) => {
			el.style.maxHeight = 0;
			const right =
				el.closest("li").clientWidth -
				el.closest("li").querySelector("h3").clientWidth;
			el.closest("li").style.setProperty("--left", "auto");
			// Note: document.documentElement is the :root element!
			el.closest("li").style.setProperty("--right", `${right}px`);
			el.closest("li").style.setProperty("--link-animation-width", `0px`);
		});

		if (currEl !== e.target) {
			e.target.closest("li").style.setProperty("--left", "0px");
			const linkAnimationWidth = e.target.clientWidth;
			e.target
				.closest("li")
				.style.setProperty(
					"--link-animation-width",
					`${linkAnimationWidth}px`
				);
			e.target
				.closest("li")
				.querySelector(".js__sub-menu").style.maxHeight = "100vh";
			setCurrEl(e.target);
		} else setCurrEl(null);
	}

	function switchSideDrawerHandler(e) {
		// Note: Sometimes e.target becomes null!
		// e.target.nextElementSibling.classList.toggle(
		// 	"translate-x-full"
		// );
		document.querySelector("body").classList.toggle("overflow-hidden");

		document
			.querySelector(".js__side-drawer")
			.classList.toggle("translate-x-full");
	}

	return (
		<header className="bg-violet-800 z-50 relative">
			<nav className="container">
				<div className="flex justify-between items-center h-[13vh] px-4 md:px-0">
					<Link href="/">
						<a className="flex w-[5.2rem] md:w-24 lg:w-auto">
							<Image
								src="/images/common/logo.jpg"
								width={120}
								height={60}
								alt="Logo"
								className="rounded-full"
							/>
						</a>
					</Link>
					<svg
						className="w-6 h-6 md:hidden fill-white"
						onClick={switchSideDrawerHandler}
					>
						<use xlinkHref="/images/common/sprite.svg#menu"></use>
					</svg>
					<ul className="js__side-drawer md:justify-evenly md:w-[70%] w-full flex md:flex-row flex-col pt-4 md:pt-0 bg-black md:bg-inherit fixed md:relative md:top-auto top-[13vh] right-0 h-[87vh] md:h-auto translate-x-full md:translate-x-0 transition-transform duration-500 px-4 md:px-0">
						<li className="nav__list group lnk">
							<h3
								className="nav__item"
								onClick={setSubMenuHeightHandler}
							>
								Currencies
							</h3>
							<div className="js__sub-menu nav__sub-menu md:max-h-[none] transition-maxHeight duration-500 max-h-0 overflow-hidden">
								<ul className="md:bg-black bg-white text-black md:text-white font-semibold relative z-10 p-5 rounded-lg">
									<li>
										<Link href="/games/game-id">
											<a className="hover:text-cyan-400">
												PUBG UC
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												COD CP
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												Free Fire Diamond
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												All Currencies
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav__list group lnk">
							<h3
								className="nav__item"
								onClick={setSubMenuHeightHandler}
							>
								Gift Cards
							</h3>
							<div className="js__sub-menu nav__sub-menu md:max-h-[none] transition-maxHeight duration-500 max-h-0 overflow-hidden">
								<ul className="md:bg-black bg-white text-black md:text-white font-semibold relative z-10 p-5 rounded-lg">
									<li>
										<Link href="/gift-cards/gift-cards-id">
											<a className="hover:text-cyan-400">
												Google Play
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												Amazon
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												Apple
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												All Gift Cards
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav__list lnk">
							<Link href="/games">
								<a className="nav__item">Razor Gold</a>
							</Link>
						</li>
						<li className="nav__list lnk">
							<Link href="/games">
								<a className="nav__item">Offers</a>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Header;
