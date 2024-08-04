import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Img from "./Img";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DisplayNotice() {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	let settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
	};

	useEffect(() => {
		let _id = JSON.parse(sessionStorage.getItem("noticeId"));
		showNotice(_id);
	}, []);

	const showNotice = async (_id) => {
		try {
			setIsLoading(true);
			await axios
				.post("https://one-pict.onrender.com/get-notice-by-id", { _id })
				.then((res) => {
					if (res.data) {
						setData(res.data);
					}
				});
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <Loader />}
			{data && (
				<div className="notice-card">
					<div className="teacher-info">
						<div className="teacher-div-btn-show">
							{data.teacherImg === "notexist" ? (
								<PiChalkboardTeacherBold />
							) : (
								<Img img={data.teacherImg} />
							)}
							<h3>{data.teacherName}</h3>
						</div>
					</div>
					<div className="main-message-div-holder">
						<h2>{data.title}</h2>
						{data.message && <p>{data.message}</p>}
						{data.link && <Link to={data.link}>More Info</Link>}
						{data.img && data.img.length > 0 && (
							<div className="notice-images">
								{data.img.length > 1 ? (
									<Slider {...settings}>
										{data.img.map((image, index) => {
											return (
												<img
													className="img-for-notice"
													key={index}
													src={image}
													alt={`Notice Image ${index + 1}`}
												/>
											);
										})}
									</Slider>
								) : (
									<img
										className="img-for-notice-outer"
										src={data.img[0]}
									/>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
