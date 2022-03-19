import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Header() {
	const [currEl, setCurrEl] = useState(null);
	const [currCurrEl, setCurrCurrEl] = useState(null);
	const router = useRouter(null);
	const { data, status } = useSession();
	const getCardRef = useRef(null);
	const currencyRef = useRef(null);

	// Warning: If bind is used for calling a function then always we need to use bund for calling that function in future and also always pass all the parameters else it will receive "this" as the first parameter.
	const switchSideDrawerHandler = useCallback(function (close) {
		if (screen.width > 800) return;
		// Note: Sometimes e.target becomes null!
		// e.target.nextElementSibling.classList.toggle(
		// 	"translate-x-full"
		// );
		document.querySelector("body").classList.toggle("overflow-hidden");
		if (close) {
			if (
				document
					.querySelector(".js__side-drawer")
					.classList.contains("translate-x-full")
			)
				return 0;
		}
		document
			.querySelector(".js__side-drawer")
			.classList.toggle("translate-x-full");
	}, []);

	useEffect(() => {
		if (screen.width > 800) return;

		function handleClickOutside(event) {
			const performAction = (ref, setEl) => {
				if (ref.current && !ref.current.contains(event.target)) {
					// ref.current.querySelector(".js__sub-menu").style.maxHeight =
					// 	"0px";
					setEl(null);
					document.querySelectorAll(".js__sub-menu").forEach((el) => {
						el.style.maxHeight = "0px";
					});
				}
			};

			performAction(getCardRef, setCurrEl);
			performAction(currencyRef, setCurrCurrEl);
		}

		let sideDrawerClickListener;
		document.querySelectorAll(".js__side-drawer a").forEach((el) => {
			sideDrawerClickListener = el.addEventListener("mousedown", () => {
				switchSideDrawerHandler(false);
			});
		});

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("mousedown", sideDrawerClickListener);
		};
	}, [switchSideDrawerHandler]);

	const signOutHandler = async () => {
		await signOut();
		router.replace("/");
	};

	function setSubMenuHeightHandler(currEl, setCurrEl, e) {
		if (screen.width > 800) return;

		document.querySelectorAll(".js__sub-menu").forEach((el) => {
			el.style.maxHeight = "0px";

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

	return (
		<header className="bg-violet-800 z-50 sticky top-0">
			<nav className="container">
				<div className="flex justify-between items-center h-[13vh] px-4 md:px-0">
					<Link href="/">
						<a
							onClick={switchSideDrawerHandler.bind(this, true)}
							className="flex w-[5.2rem] md:w-24 lg:w-auto"
						>
							<Image
								src="/images/common/logo.jpg"
								width={120}
								height={60}
								alt="Logo"
								className="rounded-full"
								placeholder="blur"
								blurDataURL="/images/common/blur.gif"
							/>
						</a>
					</Link>
					<svg
						onClick={switchSideDrawerHandler.bind(this, false)}
						className="w-6 h-6 md:hidden fill-white"
					>
						<use xlinkHref="/images/common/sprite.svg#menu"></use>
					</svg>
					<ul className="js__side-drawer md:justify-end gap-5 w-full flex md:flex-row flex-col pt-4 md:pt-0 bg-black md:bg-inherit fixed md:relative md:top-auto top-[13vh] right-0 h-[87vh] md:h-auto translate-x-full md:translate-x-0 transition-transform duration-500 px-4 md:px-0">
						<li className="nav__list group lnk" ref={currencyRef}>
							<h3
								className="nav__item"
								onClick={setSubMenuHeightHandler.bind(
									this,
									currCurrEl,
									setCurrCurrEl
								)}
							>
								Currencies
							</h3>
							<div className="js__sub-menu nav__sub-menu md:max-h-[none] transition-maxHeight duration-500 max-h-0 overflow-hidden">
								<ul className="md:bg-black bg-white text-black md:text-white font-semibold relative z-10 p-5 rounded-lg">
									<li>
										<Link href="/currency/pubg">
											<a className="hover:text-cyan-400">
												PUBG UC
											</a>
										</Link>
									</li>
									<li>
										<Link href="/currency/cod">
											<a className="hover:text-cyan-400">
												COD CP
											</a>
										</Link>
									</li>
									<li>
										<Link href="/currency/free-fire">
											<a className="hover:text-cyan-400">
												Free Fire Diamond
											</a>
										</Link>
									</li>
									<li>
										<Link href="/currency">
											<a className="hover:text-cyan-400">
												All Currencies
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav__list group lnk" ref={getCardRef}>
							<h3
								className="nav__item"
								onClick={setSubMenuHeightHandler.bind(
									this,
									currEl,
									setCurrEl
								)}
							>
								Gift Cards
							</h3>
							<div className="js__sub-menu nav__sub-menu md:max-h-[none] transition-maxHeight duration-500 max-h-0 overflow-hidden">
								<ul className="md:bg-black bg-white text-black md:text-white font-semibold relative z-10 p-5 rounded-lg">
									<li>
										<Link href="/gift-card/play">
											<a className="hover:text-cyan-400">
												Google Play
											</a>
										</Link>
									</li>
									<li>
										<Link href="/gift-card/amazon">
											<a className="hover:text-cyan-400">
												Amazon
											</a>
										</Link>
									</li>
									<li>
										<Link href="/gift-card/apple">
											<a className="hover:text-cyan-400">
												Apple
											</a>
										</Link>
									</li>
									<li>
										<Link href="/gift-card">
											<a className="hover:text-cyan-400">
												All Gift Cards
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav__list lnk">
							<Link href="/feedback">
								<a className="nav__item">Feedback</a>
							</Link>
						</li>

						<div className="w-1/4 flex gap-5 md:flex-row flex-col">
							{data && (
								<li className="nav__list lnk">
									<Link href="/profile">
										<a
											onClick={switchSideDrawerHandler.bind(
												this,
												true
											)}
											className="nav__item"
										>
											Profile
										</a>
									</Link>
								</li>
							)}

							{data && (
								<li className="nav__list lnk">
									<button
										onClick={() => {
											signOutHandler();
											switchSideDrawerHandler.bind(
												this,
												true
											);
										}}
										className="nav__item"
									>
										Sign Out
									</button>
								</li>
							)}

							{!data && status !== "loading" && (
								<li className="nav__list lnk">
									<Link href="/auth?type=sign-in">
										<a
											onClick={switchSideDrawerHandler.bind(
												this,
												true
											)}
											className="nav__item"
										>
											{/* {status === "loading" ||
									status === "authenticated"
										? "Sign Out"
										: "Sign In"} */}
											{/* Important: Point: Not doing this way because it's safe to entirely remove the unnecessary nav items from the application. */}
											Sign In
										</a>
									</Link>
								</li>
							)}

							{!data && status !== "loading" && (
								<li className="nav__list lnk">
									<Link href="/auth?type=sign-up">
										<a
											onClick={switchSideDrawerHandler.bind(
												this,
												true
											)}
											className="nav__item"
										>
											Sign Up
										</a>
									</Link>
								</li>
							)}
						</div>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Header;
