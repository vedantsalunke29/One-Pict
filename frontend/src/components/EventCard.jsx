import React, { useState } from "react";
import Img from "./Img";
import { SlCalender } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

export default function EventCard({
	_id,
	name,
	eventDate,
	imgSrc,
	setShowCard,
}) {
	const [showDelete, setShowDelete] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const deleteEvent = async () => {
		try {
			setIsLoading(true);

			await axios
				.post("https://one-pict.onrender.com/delete-event", {
					_id,
				})
				.then((res) => {
					if (res.data === "success") {
						toast.success("Successfully Deleted");
						setIsLoading(false);
						setShowCard(false);
					} else {
						setIsLoading(false);

						toast.error("Can't Delete");
					}
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`ERROR:${error}`);
		}
	};
	return (
		<>
			{isLoading && <Loader />}

			<div
				className="card-event"
				key={_id}
				onClick={() => setShowDelete(!showDelete)}
			>
				<div className="container-event">
					<Img img={imgSrc} />
					<div className="complete-event-info">
						<h2 className="name-of-event-h2">{name}</h2>
						<p>
							<SlCalender className="icon-cal" />
							{eventDate}
						</p>
					</div>
				</div>
				{showDelete && (
					<div
						className="delete-btn-event"
						onClick={deleteEvent}
					>
						<AiFillDelete />
					</div>
				)}
			</div>
		</>
	);
}
