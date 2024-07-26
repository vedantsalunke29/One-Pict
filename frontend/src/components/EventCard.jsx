import React, { useState } from "react";
import Img from "./Img";
import randomColor from "randomcolor";
import { SlCalender } from "react-icons/sl";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

export default function EventCard({
	_id,
	name,
	eventDate,
	imgSrc,
	setShowCard,
}) {
	const [showDelete, setShowDelete] = useState(false);
	let color = randomColor();

	const deleteEvent = async () => {
		try {
			await axios
				.post("https://one-pict.onrender.com/delete-event", {
					_id,
				})
				.then((res) => {
					if (res.data === "success") {
						toast.success("Successfully Deleted");
						setShowCard(false);
					} else {
						toast.error("Can't Delete");
					}
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};
	return (
		<>
			<div
				className="card-event"
				key={_id}
				onClick={() => setShowDelete(!showDelete)}
			>
				<div class="container-event">
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
