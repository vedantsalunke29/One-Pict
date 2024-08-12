import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Img from "./Img";
import { GiBookshelf } from "react-icons/gi";
import { FiFolderPlus } from "react-icons/fi";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function NotesDisplay() {
	const [notes, setNotes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isClicked, setIsClicked] = useState("Notes");

	useEffect(() => {
		let regIdNo = JSON.parse(sessionStorage.getItem("notesId"));
		showNotes(regIdNo);
	}, []);

	const showNotes = async (regIdNo) => {
		setIsLoading(true);
		try {
			await axios
				.post("https://one-pict.onrender.com/getNotes-by-id", { regIdNo })
				.then((res) => {
					if (res.data) setNotes(res.data);
				});
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <Loader />}
			{notes[0] && (
				<div className="main-notes-cover-div">
					<div className="Teacher-intro-div">
						<div className="teacher-div-btn-show">
							{notes[0].image === "notexist" ? (
								<PiChalkboardTeacherBold />
							) : (
								<Img img={notes[0].image} />
							)}
							<h3>{notes[0].teacherName}</h3>
						</div>
						<div className="notes-collect-nav">
							<ul className="Inner-navbar-notes">
								<li
									onClick={() => setIsClicked("Notes")}
									className={
										isClicked === "Notes" ? "active-notes-nav-class" : ""
									}
								>
									{" "}
									Notes <GiBookshelf />
								</li>
								<li
									onClick={() => setIsClicked("Extra")}
									className={
										isClicked === "Extra" ? "active-notes-nav-class" : ""
									}
								>
									Extra <FiFolderPlus />
								</li>
							</ul>
						</div>
					</div>
					{isClicked == "Notes" && notes.map((notes) => {
						return (
							<div className="notes-info-container-div">
								<h1>{notes.subName}</h1>
								<ul>
									<h2>{notes.section1}</h2>
									{notes.addLi1 &&
										notes.addLi1.map((i) => {
											return (
												<>
													<li>
														<Link
															to={!i ? "" : i.link}
															target="_blank"
														>
															{i.name}
														</Link>
													</li>
												</>
											);
										})}
								</ul>
								<ul>
									<h2>{notes.section2 && notes.section2}</h2>
									{notes.addLi2 &&
										notes.addLi2.map((i) => {
											return (
												<>
													<li>
														<Link
															to={!i ? "" : i.link}
															target="_blank"
														>
															{i.name}
														</Link>
													</li>
												</>
											);
										})}
								</ul>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}
