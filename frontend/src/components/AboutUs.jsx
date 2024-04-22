import React, { useEffect, useState } from "react";
import { FaSpaceShuttle } from "react-icons/fa";
import vedant from "../assets/vedant.jpg";
import sapnil from "../assets/sapnil.jpg";
import ayush from "../assets/ayush.jpg"
import jayanand from "../assets/jayanand.jpg"
import randomColor from "randomcolor";

export default function AboutUs() {
	const [show, setShow] = useState(false);
	const [rotation, setRotation] = useState("0deg");
	const [color, setColor] = useState(null);
	useEffect(() => {
		setColor(randomColor());
	},[]);
	const showUpdate = () => {
		setShow(!show);
		setRotation(`${show ? "0" : "270"}deg`);
	};
	return (
		<>
			<div className="div-conatiner-about">
				<div className="main-about-us-container">
					<div className="main-intro-about">
						<p>About us</p>
						<h2>
							We believe in the power of connections, collaboration, and shared
							experiences.
						</h2>
					</div>
					<div className="middle-mission-div">
						<button
							className="button-51"
							onClick={showUpdate}
						>
							Our Mission <FaSpaceShuttle style={{ rotate: rotation }} />
						</button>
						{show && (
							<p>
								Connecting Minds, Empowering Futures We are on a mission to
								create a thriving online community where students can seamlessly
								CONNECT .By facilitating knowledge exchange, supporting student
								initiatives, and providing a sustainable platform for goods and
								book exchanges, we aim to enhance the overall college
								experience.
							</p>
						)}
					</div>
					<div className="next-middle-div">
						<h2>What Sets Us Apart</h2>
						<p>
							ONE PICT goes beyond virtual connections, we are committed to
							promoting sustainability. Our platform includes a dedicated space
							for students to exchange books and other items, contributing to a
							greener and more resourceful college environment. <br /> <br /> We
							celebrate the diversity of our college community. ONE PICT is an
							inclusive space where every student and club is valued, and all
							information is provided.
						</p>
					</div>
					<div className="last-main-div">
						<h2>🔍 What You'll Find Here</h2>
						<p>
							Stay updated on upcoming events, both on and off-campus, and
							participate in activities that align with your interests. <br />{" "}
							<br /> Explore a sustainable marketplace where students can trade
							books and other items, promoting resourcefulness and reducing
							waste.
						</p>
					</div>
				</div>
				<div className="end-image-div">
					<h2>Meet Our Team</h2>
					<div className="image-conatin-div-about">
						<div className="image-card">
							<img
								src={vedant}
								alt="error"
							/>
							<h1
								className="name-class"
								style={{ color: color }}
							>
								Vedant
							</h1>
						</div>
						<div className="image-card">
							<img
								src={sapnil}
								alt="error"
							/>
							<h1
								className="name-class"
								style={{ color: color }}
							>
								Sapnil
							</h1>
						</div>
						<div className="image-card">
							<img
								src={ayush}
								alt="error"
							/>
							<h1
								className="name-class"
								style={{ color: color }}
							>
								Ayush
							</h1>
						</div>
						<div className="image-card">
							<img
								src={jayanand}
								alt="error"
							/>
							<h1
								className="name-class"
								style={{ color: color }}
							>
								Jayanand
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
