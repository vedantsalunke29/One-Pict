import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Img from "./Img";
import { useDispatch } from "react-redux";
import { showNameToNav } from "../store/slices/userNameSlice";
import { showImagetoNav } from "../store/slices/imageSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";

export default function Club() {
	const inputRef = useRef();
	const [cookieVal, setCookieVal] = useState(Cookies.get("regIdNo"));
	const [userName, setUserName] = useState("");
	const [userImg, setUserImg] = useState(null);
	const [userImageSource, setUserImgageSource] = useState(null);
	const [showUserImg, setShowUserImg] = useState(false);
	const [showDone, setShowDone] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [userNameUpdate, setUserNameUpdate] = useState("");
	const [userClass, setUserClass] = useState("user-image");
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const showName = async () => {
		try {
			await axios
				.post("http://localhost:5000/profile", { cookieVal })
				.then((res) => {
					if (res.data === "not") {
						setUserName("");
					} else setUserName(res.data);
				})
				.catch((error) => {
					throw new Error(`ERROR:${error}`);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};
	const deleteUserProfile = async () => {
		try {
			setIsLoading(true);
			const imgSrc = userImageSource.userImg;
			await axios
				.post("http://localhost:5000/userImage-delete", {
					cookieVal,
					imgSrc,
				})
				.then((res) => {
					if (res.data === "done") {
						toast.success("Profile removed");
						setIsLoading(false);
						setShowUserImg(false);
						dispatch(showImagetoNav(showUserImg));
					} else {
						toast.error("Something went wrong");
						setIsLoading(false);
					}
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`Error : ${error}`);
		}
	};

	const userImageUpload = async () => {
		setShowDone(false);
		try {
			setIsLoading(true);

			await axios
				.post("http://localhost:5000/userImage-post", {
					userImg,
					cookieVal,
				})
				.then((res) => {
					if (res.data === "done") {
						setShowUserImg(false);
						setUserImg(true);
						setIsLoading(false);
					} else {
						setShowUserImg(false);
						setIsLoading(false);
					}
				});
		} catch (error) {
			setIsLoading(false);

			throw new Error(`Error : ${error}`);
		}
	};

	const changeName = async () => {
		try {
			setIsLoading(true);

			await axios
				.post("http://localhost:5000/userName-update", {
					cookieVal,
					userNameUpdate,
				})
				.then((res) => {
					if (res.data === "pass") {
						setShowEdit(!showEdit);
						setIsLoading(false);

						dispatch(showNameToNav(showEdit));
						toast.success("Name changed");
					} else {
						toast.error("Can't change name!!");
						setIsLoading(false);
					}
				});
		} catch (error) {
			setIsLoading(false);

			throw new Error(`Error : ${error}`);
		}
	};

	const userImageFetch = async () => {
		try {
			setIsLoading(true);

			await axios
				.post("http://localhost:5000/userImage-get", { cookieVal })
				.then((res) => {
					if (res.data === "notexist") {
						setShowUserImg(false);
						setIsLoading(false);
					} else {
						setUserImgageSource(res.data);
						setUserClass("user-image");
						setIsLoading(false);
						dispatch(showImagetoNav(showUserImg));
						setShowUserImg(true);
					}
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`Error : ${error}`);
		}
	};

	const onChooseFile = (e) => {
		e.preventDefault();
		inputRef.current.click();
		setUserClass("no-div-class");
		setShowDone(true);
	};

	useEffect(() => {
		userImageFetch();
	}, [showUserImg, userImg, cookieVal]);

	const handleOnChange = (e) => {
		let file = inputRef.current.files[0];

		const reader = new FileReader();

		reader.onloadend = () => {
			const imgSrc = reader.result;
			setUserImg(imgSrc);
		};
		reader.readAsDataURL(file);
	};

	useEffect(() => {
		showName();
	}, [showEdit]);

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedCookie = Cookies.get("regIdNo");
			if (updatedCookie !== cookieVal) setCookieVal(updatedCookie);
		}, 1000);

		return () => clearInterval(interval);
	}, [cookieVal]);

	return (
		<>
			{isLoading && <Loader />}
			<div className="account-main-container">
				<div className="main-center-div">
					<h1
						style={{
							border: "2px solid",
							borderRadius: 10,
							padding: 5,
							fontFamily: "Roboto Slab",
						}}
					>
						Club Profile
					</h1>
					<div className="greet-user">
						{!showUserImg && (
							<div
								className={userClass}
								onClick={onChooseFile}
							>
								<MdAddAPhoto className="addUserImage" />
							</div>
						)}

						{showDone && (
							<>
								<div className="main-done-text-div">
									<div
										className="done-div"
										onClick={userImageUpload}
									>
										<MdOutlineDone />
									</div>
									<p>Click to Upload!</p>
								</div>
							</>
						)}

						{showUserImg && (
							<>
								<div className={userClass}>
									<Img img={userImageSource.userImg} />
								</div>
								<div
									className="remove-user-img"
									onClick={deleteUserProfile}
								>
									<IoMdClose className="logo-close" />
								</div>
							</>
						)}
						<input
							type="file"
							ref={inputRef}
							accept="image/*"
							onChange={handleOnChange}
							style={{ display: "none" }}
						/>
					</div>
					<div className="user-info-div">
						<p className="regId-p">Club. ID. : {cookieVal}</p>
						<div className="username-edit-div">
							{showEdit && (
								<h1 className="username-h1">
									<input
										type="text"
										className="edit-name-input"
										required
										value={userNameUpdate}
										onChange={(e) => {
											setUserNameUpdate(e.target.value);
										}}
									/>
								</h1>
							)}

							{!showEdit && <h1 className="username-h1">{userName}</h1>}
							<button className="button-50">
								{!showEdit && (
									<span
										onClick={() => {
											setShowEdit(!showEdit);
											setUserNameUpdate("");
										}}
									>
										Edit Name
									</span>
								)}
								{showEdit && (
									<span
										onClick={() => {
											changeName();
										}}
									>
										Done
									</span>
								)}
							</button>
						</div>
					</div>
				</div>
				<div className="details-div">
					<Link
						to={"/manage-content"}
						className="button-49"
					>
						Manage Content <FaBoxArchive />
					</Link>

					<Link
						to={"/upload-content"}
						className="button-49"
					>
						Upload Content <MdSell />{" "}
					</Link>
				</div>
			</div>
		</>
	);
}
