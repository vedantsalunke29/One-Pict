import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import Img from "./Img";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function DisplayEvent() {
	const [data, setData] = useState([]);
	const [showCard, setShowCard] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const showEvent = async (_id) => {
		try {
			setIsLoading(true);
			await axios
				.post("http://localhost:5000/eventInfo-get", { _id })
				.then((res) => {
					if (res.data === "not") {
						setShowCard(false);
						setIsLoading(false);
					} else {
						setData([res.data]);
						setIsLoading(false);
						setShowCard(!showCard);
					}
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`ERROR:${error.response.data}`);
		}
	};

	useEffect(() => {
		let id = JSON.parse(sessionStorage.getItem("EventInfo"));
		showEvent(id);
	}, []);

	return (
		<>
			{isLoading && <Loader />}
			{showCard && (
				<>
					<div className="main-conatiner-event-display-div">
						<div className="top-event-name">
							<h1>{data[0].eventName}</h1>
							<p>{data[0].eventDate}</p>
						</div>
						<div className="main-event-div">
							<div className="left-image-container">
								{data[0].eventImg.map((i) => {
									return (
										<div className="event-image-div">
											<Img img={i} />
										</div>
									);
								})}
							</div>
							<div className="right-event-info">
								<div className="address-div-event">
									<h3>
										<FaLocationDot />
										Address :
									</h3>
									<p>PICT, Pune</p>
								</div>
								<div className="desciption-event-div">
									<h3>
										<MdOutlineDescription />
										Event Information
									</h3>
									<p>{data[0].eventInfo}</p>
									<p>
										For more details refer -{" "}
										<Link to={data[0].contactInfo}>{data[0].contactInfo}</Link>
									</p>
								</div>
							</div>
						</div>
						<div className="empty-space-div"> </div>
					</div>
				</>
			)}
		</>
	);
}
