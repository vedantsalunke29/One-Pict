import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";

export default function Foot() {
	const navigate = useNavigate();
	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		navigate("/");
	};
	return (
		<>
			<div className="main-foot-div">
				<div className="content-foot-div">
					<div
						className="logo-foot-div"
						onClick={handleScrollToTop}
					>
						<img
							src={logo}
							className="logo-foot"
						/>
						<h1>ONE PICT</h1>
					</div>

					<Link to={"/contact"}>
						<h3>
							<RiContactsLine /> Contact
						</h3>
					</Link>
					<Link to={"/about-us"}>
						<h3>
							<FaUsers />
							About us
						</h3>
					</Link>

					<div className="foot-address-div">
						<h3>
							<FaLocationDot />
						</h3>
						<p>
							Pune Institute Of Computer Technology,
							<br />
							Survey No. 27, Near Trimurti Chowk, Dhankwadi,
							<br />
							Pune - 411043, Maharashtra.
						</p>
					</div>
				</div>
				<div className="copyright-foot-div">
					<FaRegCopyright /> Copyright 2024 ONE PICT, Inc All Rights Reserved
				</div>
			</div>
		</>
	);
}
