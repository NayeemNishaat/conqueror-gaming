import Image from "next/image";
import Link from "next/link";

function Header() {
	return (
		<header className="bg-violet-800">
			<nav className="container mx-auto">
				<div className="flex justify-between items-center h-[13vh] px-4 md:px-0">
					<Link href="/">
						<a className="flex w-[5.2rem] md:w-auto">
							<Image
								src="/images/logo.jpg"
								width={120}
								height={60}
								alt="Logo"
								className="rounded-full"
							/>
						</a>
					</Link>
					<svg className="w-6 h-6 md:hidden fill-white">
						<use xlinkHref="/images/sprite.svg#menu"></use>
					</svg>
					<ul className="md:justify-evenly md:w-[70%] w-full flex md:flex-row flex-col md:gap-0 gap-5 pt-5 md:pt-0 bg-black md:bg-inherit fixed md:top-auto top-[13vh] right-0 h-[87vh] md:h-auto translate-x-0 md:translate-x-0 transition-transform duration-500 px-4 md:px-0">
						<li className="nav__list group lnk">
							<Link href="/games">
								<a className="nav__item">Games</a>
							</Link>
							<div className="nav__sub-menu">
								<ul className="md:bg-black bg-white text-black md:text-white font-semibold relative z-10 p-5 rounded-lg">
									<li>
										<Link href="/games/game-id">
											<a className="hover:text-cyan-400">
												PUBG
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												COD
											</a>
										</Link>
									</li>
									<li>
										<Link href="/games/pubg">
											<a className="hover:text-cyan-400">
												Free Fire
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav__list group lnk">
							<Link href="/gift-cards">
								<a className="nav__item">
									Gift Cards
								</a>
							</Link>
							<div className="nav__sub-menu">
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
												Steam
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav__list lnk">
							<Link href="/games">
								<a className="nav__item">
									Razor Gold
								</a>
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
