import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import Marquee from "react-fast-marquee";
import Foot from "./Foot";
import Img from "./Img";
import randomColor from "randomcolor";
import axios from "axios";
import IEEE from "../assets/pisb.png";
import CSI from "../assets/CSI.jpg";
import ACM from "../assets/ACM.png";
import GameDev from "../assets/gamedevutopia_logo.jpg";
import PAC from "../assets/PAC.png";
import PIC from "../assets/pictoreal.png";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import home from "../assets/unnamed-removebg.png";
import forum from "../assets/oneforum.png";
import { AiOutlineMessage } from "react-icons/ai";
import Cookies from "js-cookie";
import {
	ScrollContainer,
	ScrollPage,
	Animator,
	batch,
	Fade,
	ZoomIn,
	FadeIn,
	MoveIn,
} from "react-scroll-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import DiscussionCard from "./DiscussionCard";
import { useSelector } from "react-redux";
import MovieRecommendations from "./MovieRecommendations";
import { DNA } from "react-loader-spinner";

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
				.get(`http://localhost:3500/detect/${text}`)
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
		let color = randomColor();
		return (
			<>
				<div
					className="card-event"
					key={id}
					onClick={() => showPage(id)}
				>
					<div className="container-event">
						<Img img={imgSrc} />
						<h2
							className="name-of-event-h2"
							style={{ color: color }}
						>
							{name}
						</h2>
						<p>
							<SlCalender className="icon-cal" />
							{eventDate}
						</p>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="main-home-conatiner">
				<ScrollContainer>
					<ScrollPage
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
						}}
					>
						<Animator animation={batch(Fade(), ZoomIn(), MoveIn())}>
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
									<img
										src={home}
										alt=""
									/>
								</div>
							</div>
						</Animator>
					</ScrollPage>
					<ScrollPage
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
						}}
					>
						<div className="page-2-home-div">
							<Animator animation={batch(FadeIn(), MoveIn())}>
								<div className="inside-event-ann">
									<p>Upcoming Event</p>
								</div>
							</Animator>

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
					</ScrollPage>
					<ScrollPage
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
							marginTop: 40,
							position: "relative",
						}}
					>
						<div className="page-3-main-div">
							<div className="background-page3">
								<Animator animation={batch(FadeIn(), MoveIn())}>
									<h1 className="club-head">Popular Clubs</h1>
								</Animator>
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
					</ScrollPage>
					<ScrollPage
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
							marginTop: 20,
							position: "relative",
						}}
					>
						<Animator animation={batch(FadeIn(), MoveIn())}>
							<div className="main-container-for-page-4">
								<h1 className="page-4-title">One Forum</h1>
								<h2 className="page-4-2-title">Discussion Forum by One Pict</h2>
								<h3 className="page-4-3-info">
									<p>🌟</p>
									Join the conversation and connect with like-minded individuals
									on our vibrant discussion forum! Explore diverse topics, share
									insights, and expand your horizons in a welcoming community.
								</h3>
								<div className="img-page-4">
									<img
										src={forum}
										alt=""
									/>
								</div>
							</div>
						</Animator>
					</ScrollPage>
					<ScrollPage
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<Animator>
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
										height="150"
										width="150"
										ariaLabel="dna-loading"
										wrapperStyle={{}}
										wrapperClass="dna-wrapper"
									/>
								)}
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
							</div>
						</Animator>
					</ScrollPage>
					<ScrollPage
						style={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
							height: 800,
							position: "relative",
						}}
					>
						<div className="third-page-div">
							<div className="main-div-third-page">
								<div className="home-movie-div">
									<Animator animation={batch(FadeIn(), MoveIn(100, 0))}>
										<h1 className="Heading-for-movies">
											Want some binge-watch suggestion ?
										</h1>
									</Animator>

									<div className="info-movie">
										Get similar content according to your previous watch and
										discover movies you'll love!
									</div>
									<MovieRecommendations />
								</div>
								<Animator animation={batch(FadeIn(), MoveIn(-100, 0))}>
									<p>
										Developed by PICT student for fostering connections,
										providing support networks, facilitating knowledge sharing,
										and promoting collaboration among like-minded individuals.
									</p>
								</Animator>
								<Animator animation={batch(FadeIn(), MoveIn())}>
									<button
										className="button-55"
										onClick={() => {
											navigate("/about-us");
										}}
									>
										Learn More
									</button>
								</Animator>
							</div>
						</div>
					</ScrollPage>
				</ScrollContainer>
			</div>
			<Foot />
		</>
	);
}
