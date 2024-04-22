import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import video from "../assets/empty.mp4";
import EventCard from "./EventCard";

export default function ManageContent() {
	const [regIdNo, setRegIdNo] = useState(Cookies.get("regIdNo"));
	const [eventCardItem, setEventCardItem] = useState([]);
	const [showCard, setShowCard] = useState(false);

	const showEvent = async () => {
		try {
			await axios
				.post("http://localhost:5000/eventInfo-get-regIdNo", { regIdNo })
				.then((res) => {
					if (res.data === "nothing") setShowCard(false);
					else {
						setEventCardItem(res.data);
						setShowCard(true);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};

	useEffect(
		() => {
			showEvent();
		},
		[showCard],
		[],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedCookie = Cookies.get("regIdNo");
			if (updatedCookie !== regIdNo) setRegIdNo(updatedCookie);
		}, 1000);

		return () => clearInterval(interval);
	}, [regIdNo]);

	return (
		<>
			{showCard && (
				<div className="main-buy-page-main">
					<div className="title-your-product">
						<h1>Your Content</h1>
					</div>
					<div className="nonMain">
						{eventCardItem.map((i) => {
							return (
								<>
									<EventCard
										id={i._id}
										name={i.eventName}
										eventDate={i.eventDate}
										imgSrc={i.eventImg[0]}
										setShowCard={setShowCard}
									/>
								</>
							);
						})}
					</div>
				</div>
			)}
			{!showCard && (
				<div className="nothing-to-dis">
					<video
						autoPlay
						muted
						loop
						className="video"
					>
						<source
							src={video}
							type="video/mp4"
						/>
						Sorry, your browser doesn't support videos.
					</video>
				</div>
			)}
		</>
	);
}
