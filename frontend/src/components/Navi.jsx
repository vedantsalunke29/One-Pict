import { useState, useEffect, useRef } from "react";
import img from "../assets/logo.png";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { RiContactsLine, RiUserAddLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import axios from "axios";
import { useScroll } from "../scroll/hideNavBar";
import Img from "./Img";
import { useSelector } from "react-redux";

export default function Navi() {
	const TOP_OFFSET = 50;
	const [color, setColor] = useState("");
	const [show, setShow] = useState(false);
	const [userName, setUserName] = useState("");
	const [showUserImg, setShowUserImg] = useState(false);
	const [userImgageSource, setUserImgageSource] = useState("");
	const [cookieVal, setCookieVal] = useState(Cookies.get("regIdNo"));
	const navigate = useNavigate();
	let ref = useRef();
	const location = useLocation();
	const showEdit = useSelector((state) => {
		return state.userName;
	});
	const showUserImgFromAcc = useSelector((state) => {
		return state.image;
	});
	const logOut = () => {
		Cookies.remove("regIdNo");
	};
	const tagClass1 =
		location.pathname === "/" ? "main-text-style-active" : "main-text-style";
	const tagClass2 =
		location.pathname === "/buy-sell"
			? "main-text-style-active"
			: "main-text-style";
	const showName = async () => {
		try {
			await axios
				.post("http://localhost:5000/profile", { cookieVal })
				.then((res) => {
					if (res.data === "not") {
						setUserName("User");
					} else {
						setUserName(res.data);
					}
				})
				.catch((error) => {
					throw new Error(`ERROR:${error}`);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};

	const userImageFetch = async () => {
		try {
			await axios
				.post("http://localhost:5000/userImage-get", { cookieVal })
				.then((res) => {
					if (res.data === "notexist") setShowUserImg(false);
					else {
						setUserImgageSource(res.data);
						setShowUserImg(true);
					}
				});
		} catch (error) {
			throw new Error(`Error : ${error}`);
		}
	};

	useEffect(() => {
		userImageFetch();
		showName();
	}, [showEdit, showUserImgFromAcc, cookieVal]);

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedCookie = Cookies.get("regIdNo");
			if (updatedCookie !== cookieVal) setCookieVal(updatedCookie);
		}, 1000);

		return () => clearInterval(interval);
	}, [cookieVal]);

	useEffect(() => {
		let checkIfClickedOutside = (e) => {
			if (show && ref.current && !ref.current.contains(e.target)) {
				setShow(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	});

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= TOP_OFFSET) {
				setColor("snow");
			} else {
				setColor("");
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollDirection = useScroll();

	const styles = {
		active: {
			visibility: "visible",
			transition: "all 0.5s",
			backgroundColor: "#ffffff37",
		},
		hidden: {
			visibility: "hidden",
			transition: "all 0.5s",
			transform: "translateY(-100%)",
		},
	};

	return (
		<motion.nav
			animate={{ backgroundColor: color }}
			style={scrollDirection === "up" ? styles.active : styles.hidden}
		>
			<div className="show-all">
				{cookieVal !== undefined && (
					<div className="user-btn">
						{showUserImg && <Img img={userImgageSource.userImg} />}
						{!showUserImg && <VscAccount />}
						<h3
							onClick={() => {
								setShow(!show);
							}}
						>
							{userName}
						</h3>
					</div>
				)}
				{!show && (
					<IoIosArrowDown
						onClick={() => {
							setShow(!show);
						}}
					/>
				)}
				{show && <IoMdClose />}
			</div>
			<div
				className="logo"
				onClick={() => navigate("/")}
			>
				<img
					src={img}
					alt="Not Found"
				/>
				<h2>ONE PICT</h2>
			</div>
			<div className="tech-notech-div">
				<Link
					className={tagClass1}
					to={"/"}
				>
					Community
				</Link>
				<Link
					className={tagClass2}
					to={"/buy-sell"}
				>
					Pict OLX
				</Link>
			</div>
			{show && (
				<>
					<motion.div
						ref={ref}
						className="right"
						animate={{ y: [100, 0], opacity: [0, 1] }}
						transition={{ duration: 1 }}
					>
						{cookieVal !== undefined &&
							!cookieVal.includes("CB") &&
							!cookieVal.includes("T") && (
								<Link
									className="link-abt-ct"
									to={"/my-profile"}
								>
									<ImProfile /> My Profile
								</Link>
							)}
						{cookieVal !== undefined && cookieVal.includes("CB") && (
							<Link
								className="link-abt-ct"
								to={"/club-my-profile"}
							>
								<ImProfile /> My Profile
							</Link>
						)}
						{cookieVal !== undefined && cookieVal.includes("T") && (
							<Link
								className="link-abt-ct"
								to={"/teacher-profile"}
							>
								<ImProfile /> My Profile
							</Link>
						)}

						<Link
							className="link-abt-ct"
							to={"/contact"}
						>
							<RiContactsLine /> Contact
						</Link>
						<Link
							to={"/about-us"}
							className="link-abt-ct"
						>
							<FaUsers /> About us
						</Link>
						{cookieVal !== undefined && (
							<Link
								to={"/signin"}
								className="link-abt-ct"
								onClick={() => {
									logOut();
								}}
							>
								<FiLogOut /> Logout
							</Link>
						)}
						{cookieVal === undefined && (
							<>
								<Link
									to={"/signin"}
									className="link-abt-ct"
								>
									<GoSignIn /> Sign In
								</Link>
								<Link
									to={"/signup"}
									className="link-abt-ct"
								>
									<RiUserAddLine /> Sign Up
								</Link>{" "}
							</>
						)}
					</motion.div>
				</>
			)}
		</motion.nav>
	);
}
