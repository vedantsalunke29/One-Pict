import React, { useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { FiFolderPlus } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function Notes() {
	const [isClicked, setIsClicked] = useState("Notes");
	const [addSubject, setAddSubject] = useState(false);
	const [subName, setSubName] = useState();
	const [section1, setSection1] = useState();
	const [section2, setSection2] = useState();
	const cookieVal = Cookies.get("regIdNo");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [inputLi1, setInputLi1] = useState({
		name: "",
		link: "",
	});
	const [inputLi2, setInputLi2] = useState({
		name: "",
		link: "",
	});
	const [addLi1, setAddLi1] = useState([]);
	const [addLi2, setAddLi2] = useState([]);

	const handleAdd1 = () => {
		if (inputLi1.name && inputLi1.link) setAddLi1([...addLi1, inputLi1]);
	};

	const handleDelete1 = (index) => {
		const newTodos = [...addLi1];
		newTodos.splice(index + 1, 1);
		setAddLi1(newTodos);
	};

	const handleAdd2 = () => {
		if (inputLi2.name && inputLi2.link) setAddLi2([...addLi2, inputLi2]);
	};
	const handleDelete2 = (index) => {
		const newTodos = [...addLi2];
		newTodos.splice(index, 1);
		setAddLi2(newTodos);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (addLi1.length === 0) toast.error("Add Value and Link");
		else
			try {
				await axios
					.post("https://one-pict.onrender.com/add-notes-by-id", {
						cookieVal,
						subName,
						section1,
						section2,
						addLi1,
						addLi2,
					})
					.then((res) => {
						if (res.data === "success") toast.success("uploaded");
						else toast.error("Error occured");
						setIsLoading(false);
						sessionStorage.setItem("notesId", JSON.stringify(cookieVal));
						navigate("/notes-page");
					});
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}

		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className="main-notes-cover-div">
				<div className="Teacher-intro-div">
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

				<div
					className="add-subject-notes-div"
					onClick={() => {
						setAddSubject(!addSubject);
					}}
				>
					Add Subject
					<IoIosAdd />
				</div>

				{addSubject && isClicked === "Notes" && (
					<form
						className="sub-input-form"
						onSubmit={handleSubmit}
					>
						<div className="input-sub-notes-div">
							<input
								type="text"
								onChange={(e) => {
									setSubName(e.target.value);
								}}
								value={subName}
								placeholder="Subject Name"
								required
							/>
							<input
								type="text"
								onChange={(e) => {
									setSection1(e.target.value);
								}}
								value={section1}
								placeholder="Section 1"
								required
							/>
							<ul className="addli-ul-notes">
								<li>
									<input
										type="text"
										placeholder="Name"
										required
										value={inputLi1.name}
										onChange={(e) =>
											setInputLi1({ ...inputLi1, name: e.target.value })
										}
									/>{" "}
									:{" "}
									<input
										type="text"
										placeholder="Drive Link"
										required
										value={inputLi1.link}
										onChange={(e) =>
											setInputLi1({ ...inputLi1, link: e.target.value })
										}
									/>
									<MdDone onClick={handleAdd1} />
								</li>

								{addLi1.map((input) => (
									<li>
										<div>
											{input.name}: {input.link}
											<MdDeleteOutline
												onClick={handleDelete1}
												style={{ color: "red" }}
											/>
										</div>
									</li>
								))}
							</ul>
							<input
								type="text"
								onChange={(e) => {
									setSection2(e.target.value);
								}}
								value={section2}
								placeholder="Section 2"
							/>

							<ul className="addli-ul-notes">
								<li>
									<input
										type="text"
										placeholder="Name"
										value={inputLi2.name}
										onChange={(e) =>
											setInputLi2({ ...inputLi2, name: e.target.value })
										}
									/>{" "}
									:{" "}
									<input
										type="text"
										placeholder="Drive Link"
										value={inputLi2.link}
										onChange={(e) =>
											setInputLi2({ ...inputLi2, link: e.target.value })
										}
									/>
									<MdDone onClick={handleAdd2} />
								</li>
								{addLi2.map((input) => (
									<li>
										<div>
											{input.name} : {input.link}
											<MdDeleteOutline
												onClick={handleDelete2}
												style={{ color: "red" }}
											/>
										</div>
									</li>
								))}
							</ul>
							<button type="submit">
								<MdDone />
							</button>
						</div>
					</form>
				)}
			</div>
		</>
	);
}
