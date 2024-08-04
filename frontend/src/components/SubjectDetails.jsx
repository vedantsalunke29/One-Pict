import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import Img from "./Img";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { PiChalkboardTeacherBold } from "react-icons/pi";

export default function SubjectDetails() {
	const [note, setNote] = useState([]);
	const navigate = useNavigate();

	const showNotes = (regIdNo) => {
		sessionStorage.setItem("notesId", JSON.stringify(regIdNo));
		navigate("/notes-page");
	};

	const getNotes = async () => {
		try {
			await axios
				.get("https://one-pict.onrender.com/get-post-by-id")
				.then((res) => {
					if (res.data) {
						setNote(res.data);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getNotes();
	}, []);
	return (
		<>
			<div className="main-notes-diplay-div-container">
				<h1>
					Study Material
					<IoBookSharp />
				</h1>
				<ul className="note-contain-div-teacher">
					<h2>Get all the study material on single click</h2>
					<li className="teacher-name-li-show">
						{note.map((i) => {
							return (
								<>
									<div
										className="teacher-div-btn"
										onClick={() => {
											showNotes(i.regIdNo);
										}}
									>
										{i.image === "notexist" ? (
											<PiChalkboardTeacherBold />
										) : (
											<Img img={i.image} />
										)}
										<h3>{i.teacherName}</h3>
										<CgArrowsExpandUpRight />
									</div>
								</>
							);
						})}
					</li>
				</ul>
			</div>
		</>
	);
}
