import Image from "next/image";
import Link from "next/link";

function Header() {
	return (
		<header className="bg-violet-800">
			<nav className="container mx-auto">
				<div className="flex justify-between items-center h-24">
					<Link href="/">
						<a className="flex">
							<Image
								src="/images/logo.jpg"
								width={128}
								height={72}
								alt="Logo"
								className="rounded-full"
							/>
						</a>
					</Link>
					<ul className="flex justify-evenly w-[70%]">
						<li className="nav__list group">
							<Link href="/games">
								<a className="nav__item">Games</a>
							</Link>
							<div className="nav__sub-menu">
								<ul>
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
						<li className="nav__list group">
							<Link href="/gift-cards">
								<a className="nav__item">
									Gift Cards
								</a>
							</Link>
							<div className="nav__sub-menu">
								<ul>
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
						<li className="nav__list group">
							<Link href="/games">
								<a className="nav__item">
									Razor Gold
								</a>
							</Link>
						</li>
						<li className="nav__list group">
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
