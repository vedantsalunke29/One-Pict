import axios from "axios";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import Img from "./Img";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
AnnouncementHome.propTypes = {
	cookieValue: PropTypes.string.isRequired,  
};
export default function AnnouncementHome({cookieValue}) {
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getData();
	}, [cookieValue]);

	const showNotice = (_id) => {
		sessionStorage.setItem("noticeId", JSON.stringify(_id));
		navigate("/view-announcement");
	};
	const getData = async () => {
		try {
			setIsLoading(true);
			await axios
				.get("http://localhost:5000/get-announcement")
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
			<div className="home-announcement-view-div">
				<div className="div-svg-announcement-conatian"></div>
				<div className="head-for-announcement-h1">New Notice</div>
				<div className="body-for-the-announcement-div">
					{isLoading && (
						<LineWave
							visible={true}
							height="100"
							width="100"
							color="#4fa94d"
							ariaLabel="line-wave-loading"
							wrapperStyle={{}}
							wrapperClass=""
							firstLineColor=""
							middleLineColor=""
							lastLineColor=""
						/>
					)}
					{!isLoading && (
						<ul>
							{data.map((item,index) => {
								return (
									<li
										key={index}
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
					)}
				</div>
			</div>
		</>
	);
}
