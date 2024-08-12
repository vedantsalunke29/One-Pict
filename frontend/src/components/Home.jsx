import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import Marquee from "react-fast-marquee";
import Foot from "./Foot";
import Img from "./Img";
import axios from "axios";
import IEEE from "../assets/pisb.png";
import CSI from "../assets/CSI.jpg";
import ACM from "../assets/ACM.png";
import GameDev from "../assets/gamedevutopia_logo.jpg";
import PAC from "../assets/PAC.png";
import PIC from "../assets/pictoreal.png";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import home from "../assets/side-home.mp4";
import forum from "../assets/oneforum.png";
import { AiOutlineMessage } from "react-icons/ai";
import Cookies from "js-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import DiscussionCard from "./DiscussionCard";
import { useSelector } from "react-redux";
import SubjectDetails from "./SubjectDetails";
import { DNA } from "react-loader-spinner";
import AnnouncementHome from "./AnnouncementHome";

export default function Home() {
	let settings = {
		dots: true,
		infinite: true,
		speed: 500,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	const [eventCardItem, setEventCardItem] = useState([]);
	const [showCard, setShowCard] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [showDiscussion, setShowDiscussion] = useState(false);
	const navigate = useNavigate();
	const [discussMsg, setDiscussMsg] = useState("");
	const [cookieVal, setCookieVal] = useState(Cookies.get("regIdNo"));
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const replyInput = useSelector((state) => {
		return state.userName;
	});
	const openClub = (clubName) => {
		sessionStorage.setItem("ClubInfo", JSON.stringify(clubName));
		navigate("/club-info");
	};
	const showPage = (id) => {
		sessionStorage.setItem("EventInfo", JSON.stringify(id));
		navigate("/event-page");
	};

	const isLogin = () => {
		if (cookieVal);
		else {
			navigate("/signin");
			toast.error("Please Login.");
		}
	};

	const getEventData = async () => {
		try {
			setIsLoading(true);
			await axios
				.get("https://one-pict.onrender.com/get-eventInfo")
				.then((res) => {
					if (res.data === "nothing") {
						setShowCard(false);
						setIsLoading(false);
					} else {
						setEventCardItem(res.data);
						setIsLoading(false);
						setShowCard(!showCard);
					}
				})
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`ERROR:${error}`);
		}
	};
	const getTextReport = async (text) => {
		try {
			setIsLoading(true);

			await axios
				.get(`http://127.0.0.1:5000/detect/${text}`)
				.then((res) => {
					setIsLoading(true);
					if (res.length < 0) {
						setIsLoading(false);
					} else {
						if (res.data == "Offensive lang" || res.data == "hate speech")
							toast.error("Hate Speech Detect");
						else sumbitDiscuss();
						setIsLoading(false);
					}
				})
				.catch((error) => {
					setIsLoading(false);
					console.error("Error fetching recommendations:", error);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};
	const sumbitDiscuss = async () => {
		try {
			setIsLoading(true);

			await axios
				.post("https://one-pict.onrender.com/postDiscuss", {
					cookieVal,
					discussMsg,
				})
				.then((res) => {
					if (res.data.message === "fail") {
						setDiscussMsg("");
						toast.error("Error Occured");
						setIsLoading(false);
					} else if (res.data.message === "done") {
						setDiscussMsg("");
						setData(res.data.contain);
						setShowDiscussion(true);
						toast.success("Added ✔");
						setIsLoading(false);
					}
				});
		} catch (error) {
			setIsLoading(false);

			console.log(error);
		}
	};

	const getDiscussion = async () => {
		try {
			setIsLoading(true);
			await axios
				.get("https://one-pict.onrender.com/get-discussion-data")
				.then((res) => {
					if (res.data === "fail") {
						setIsLoading(false);
						setShowDiscussion(false);
					} else {
						setData(res.data);
						setIsLoading(false);
						setShowDiscussion(true);
					}
				});
		} catch (error) {
			setIsLoading(false);
			setShowDiscussion(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getEventData();
		getDiscussion();
	}, [cookieVal]);

	useEffect(() => {
		getDiscussion();
	}, [replyInput]);

	const EventCard = ({ id, name, eventDate, imgSrc }) => {
		return (
			<>
				<div
					className="card-event"
					key={id}
					onClick={() => showPage(id)}
				>
					<div className="container-event">
						<Img img={imgSrc} />
						<div className="complete-event-info">
							<h2 className="name-of-event-h2">{name}</h2>
							<p>
								<SlCalender className="icon-cal" />
								{eventDate}
							</p>
							<button className="see-details-btn">See details</button>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="main-home-conatiner">
				<div className="background">
					<div className="community">
						<p>Exclusive</p>
						Welcome to one pict Community web which <br />
						<TypeAnimation
							sequence={[
								`bring you closer !`,
								2000,
								" unites college minds.",
								2000,
								"fuels academic exchange.",
								2000,
							]}
							speed={1}
							repeat={Infinity}
							className="type-speed"
						/>
					</div>
					<div className="cloud">
						<video
							autoPlay
							muted
							loop
						>
							<source
								src={home}
								type="video/mp4"
							/>
							Sorry, your browser doesn't support videos.
						</video>
					</div>
				</div>
				<AnnouncementHome />
				<div className="page-2-home-div">
					<div className="inside-event-ann">
						<p>Upcoming Event</p>
					</div>

					<div className="event-announcement">
						{isLoading && (
							<DNA
								visible={true}
								height="80"
								width="80"
								ariaLabel="dna-loading"
								wrapperStyle={{ position: "absolute" }}
								wrapperClass="dna-wrapper"
							/>
						)}
						{!isLoading && (
							<div className="card-slider">
								<Slider {...settings}>
									{eventCardItem.map((i) => {
										return (
											<>
												<EventCard
													key={i._id}
													id={i._id}
													name={i.eventName}
													eventDate={i.eventDate}
													imgSrc={i.eventImg[0]}
												/>
											</>
										);
									})}
								</Slider>
							</div>
						)}
					</div>
				</div>

				<div className="page-3-main-div">
					<div className="background-page3">
						<h1 className="club-head">Popular Clubs</h1>

						<Marquee autoFill>
							<div className="club-logo-conatiner">
								<div
									key={1}
									className="logo-card-club-black"
									onClick={() => openClub("IEEE")}
								>
									<img src={IEEE} />
									<p>IEEE</p>
								</div>

								<div
									key={2}
									className="logo-card-club"
									onClick={() => openClub("ACM")}
								>
									<img src={ACM} />
									<p>ACM</p>
								</div>
								<div
									key={3}
									className="logo-card-club-black"
									onClick={() => openClub("GameDevUtopia")}
								>
									<img src={GameDev} />
									<p>GameDevUtopia</p>
								</div>
								<div
									key={4}
									className="logo-card-club"
									onClick={() => openClub("PAC")}
								>
									<img src={PAC} />
									<p>PAC</p>
								</div>
								<div
									key={5}
									className="logo-card-club-black"
									onClick={() => openClub("CSI")}
								>
									<img src={CSI} />
									<p>CSI</p>
								</div>
								<div
									key={6}
									className="logo-card-club"
									onClick={() => openClub("PIC")}
								>
									<img src={PIC} />
								</div>
							</div>
						</Marquee>
					</div>
				</div>
				<SubjectDetails />

				<div className="main-container-for-page-4">
					<h1 className="page-4-title">One Forum</h1>
					<h2 className="page-4-2-title">Discussion Forum by One Pict</h2>
					<h3 className="page-4-3-info">
						<p>🌟</p>
						Join the conversation and connect with like-minded individuals on
						our vibrant discussion forum! Explore diverse topics, share
						insights, and expand your horizons in a welcoming community.
					</h3>
					<div className="img-page-4">
						<img
							src={forum}
							alt=""
						/>
					</div>
				</div>

				<div
					onClick={isLogin}
					className="main-page-5-container"
				>
					<div className="upper-main-container-div">
						<div className="left-main-div-page-5">
							{showInput && (
								<div className="main-upper-div-page-5">
									<>
										{" "}
										<h3>
											<AiOutlineMessage /> Discuss
										</h3>
										<textarea
											className="input-new-discuss"
											value={discussMsg}
											onChange={(e) => {
												setDiscussMsg(e.target.value);
											}}
										/>
										<button
											className="button-27"
											onClick={() => {
												getTextReport(discussMsg);
											}}
										>
											Submit
										</button>
									</>
								</div>
							)}
						</div>
						<div className="right-main-div-page-5">
							<div className="new-conversation-main-div">
								<div
									className="checkbox-wrapper-50"
									onClick={() => {
										setShowInput(!showInput);
									}}
								>
									<input
										type="checkbox"
										className="plus-minus"
									/>
								</div>
								<p>Have something on mind ?</p>
								<p>Feel free to discuss</p>
							</div>
						</div>
					</div>
					{isLoading && (
						<DNA
							visible={true}
							height="80"
							width="80"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper"
						/>
					)}
					{!isLoading && (
						<div className="lower-dicussion-conatiner-div-main">
							<div className="main-lower-div-page-5">
								{showDiscussion && (
									<div className="main-discuss-info-div">
										{data.map((item) => {
											return (
												<DiscussionCard
													key={item._id}
													item={item}
												/>
											);
										})}
									</div>
								)}
								{!showDiscussion && !isLoading && (
									<h1 className="no-discussion-available">No Discussion</h1>
								)}
							</div>
						</div>
					)}
				</div>

				<div className="third-page-div">
					<div className="main-div-third-page">
						<div className="academic-calendar">
							<iframe
								src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&src=cGljdC5lZHVfOHNuaW1ncXFlNWkxcGVsZzh0Y2VsbjkxMXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4"
								title="Academic Calendar"
							></iframe>
						</div>
						<p>
							Developed by PICT student for fostering connections, providing
							support networks, facilitating knowledge sharing, and promoting
							collaboration among like-minded individuals.
						</p>
						<button
							className="button-55"
							onClick={() => {
								navigate("/about-us");
							}}
						>
							Learn More
						</button>
					</div>
				</div>
			</div>
			<Foot />
		</>
	);
}
