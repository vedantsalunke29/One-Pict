import axios from "axios";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import Img from "./Img";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { DNA } from "react-loader-spinner";

SubjectDetails.propTypes = {
	cookieValue: PropTypes.string.isRequired,  
};
export default function SubjectDetails({cookieValue}) {
	const [note, setNote] = useState([]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const showNotes = (regIdNo) => {
		sessionStorage.setItem("notesId", JSON.stringify(regIdNo));
		navigate("/notes-page");
	};

	const getNotes = async () => {
		try {
			setIsLoading(true);
			await axios
				.get("http://localhost:5000/get-post-by-id")
				.then((res) => {
					if (res.data) {
						setNote(res.data);
					}
				});
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		getNotes();
	}, [cookieValue]);
	return (
		<>
			<div className="main-notes-diplay-div-container">
				<h1>
					Study Material
					<IoBookSharp />
				</h1>
				<ul className="note-contain-div-teacher">
					<h2>Get all the study material on single click</h2>
					{isLoading && (
						<DNA
							visible={true}
							height="80"
							width="80"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper"
						/>
					)}
					{!isLoading && (
						<li className="teacher-name-li-show">
							{note.map((i,index) => {
								return (
									<>
										<div
											className="teacher-div-btn"
											onClick={() => {
												showNotes(i.regIdNo);
											}}
											key={index}
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
					)}
				</ul>
			</div>
		</>
	);
}
