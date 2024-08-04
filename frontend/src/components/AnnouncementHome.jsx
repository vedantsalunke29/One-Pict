import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import Img from "./Img";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function AnnouncementHome() {
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		getData();
	}, []);

	const showNotice = (_id) => {
		sessionStorage.setItem("noticeId", JSON.stringify(_id));
		navigate("/view-announcement");
	};
	const getData = async () => {
		try {
			await axios
				.get("https://one-pict.onrender.com/get-announcement")
				.then((res) => {
					if (res.data) {
						setData(res.data);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className="home-announcement-view-div">
				<div className="div-svg-announcement-conatian"></div>
				<div className="head-for-announcement-h1">New Notice</div>
				<div className="body-for-the-announcement-div">
					<ul>
						{data.map((item) => {
							return (
								<li
									key={item._id}
									onClick={() => {
										showNotice(item._id);
									}}
								>
									<div
										className="user-notice-btn"
										onClick={() => {}}
									>
										{item.teacherImg === "notexist" ? (
											<PiChalkboardTeacherBold />
										) : (
											<Img img={item.teacherImg} />
										)}
										<h3>
											{item.teacherName}
											<div className="main-notice-div">{item.title}</div>
										</h3>
									</div>
									<CgArrowsExpandUpRight />
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
