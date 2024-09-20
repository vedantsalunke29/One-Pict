import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import video from "../assets/empty.mp4";
import EventCard from "./EventCard";
import Loader from "./Loader";

export default function ManageContent() {
	const [regIdNo, setRegIdNo] = useState(Cookies.get("regIdNo"));
	const [eventCardItem, setEventCardItem] = useState([]);
	const [showCard, setShowCard] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const showEvent = async () => {
		try {
			setIsLoading(true);
			await axios
				.post("http://localhost:5000/eventInfo-get-regIdNo", {
					regIdNo,
				})
				.then((res) => {
					if (res.data === "nothing") {
						setShowCard(false);
						setIsLoading(false);
					} else {
						setEventCardItem(res.data);
						setIsLoading(false);
						setShowCard(true);
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
			{isLoading && <Loader />}

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
										_id={i._id}
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
			{!showCard && <h1 className="no-product">No Event</h1>}
		</>
	);
}
