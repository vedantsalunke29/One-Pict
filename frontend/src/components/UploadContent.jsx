import React, { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function UploadContent() {
	const inputRef = useRef();
	const [selectedFile, setSelectedFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [uploadStatus, setUploadStatus] = useState("select");
	const cookieVal = Cookies.get("regIdNo");
	const [filesToShow, setFilesToShow] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		eventName: "",
		eventDate: "",
		eventInfo: "",
		contactInfo: "",
		eventImg: [],
	});

	const onChooseFile = (e) => {
		e.preventDefault();
		inputRef.current.click();
	};

	const handleOnChange = (e) => {
		let files = inputRef.current.files;
		const readAndPreview = (file) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				const imgSrc = reader.result;
				form.eventImg.push(imgSrc);
			};
			reader.readAsDataURL(file);
			filesToShow.push(file);
			setSelectedFile(e.target.files[0]);
		};
		if (files.length > 6) {
			toast.error("Max 6 images are allowed");
			clearFileInput();
		} else if (files) {
			Array.prototype.forEach.call(files, readAndPreview);
		}
	};

	const clearFileInput = () => {
		inputRef.current.value = "";
		setFilesToShow([]);
		setSelectedFile(null);
		setProgress(0);
		setUploadStatus("select");
	};

	const submit = async (e) => {
		e.preventDefault();
		if (uploadStatus === "done") {
			clearFileInput();
			return;
		}
		try {
			setUploadStatus("uploading");
			setIsLoading(true);
			axios
				.post(
					"https://one-pict.onrender.com/eventInfo",
					{ form, cookieVal },
					{
						onUploadProgress: (progressEvent) => {
							const percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total,
							);
							setProgress(percentCompleted);
						},
					},
				)
				.then((res) => {
					if (res.data === "done") {
						setIsLoading(false);
						setUploadStatus("done");
						toast.success("Uploaded successfully!!");
						navigate("/manage-content");
					} else {
						setIsLoading(false);
						toast.error("Something went wrong!!");
					}
				});
		} catch (error) {
			setUploadStatus("select");
			setIsLoading(false);
		}
	};
	return (
		<div className="conatiner-for-sell-form">
			{isLoading && <Loader />}
			<div className="main-sell-body">
				<div className="sell-title">
					<h1>Add Event</h1>
				</div>
				<div className="sellFrm">
					<form
						action=""
						className="sell-form"
						onSubmit={submit}
					>
						<div className="div-input-container">
							<div className="inputContainer">
								<input
									type="text"
									className="input"
									placeholder="a"
									required
									value={form.eventName}
									onChange={(e) => {
										setForm({
											...form,
											eventName: e.target.value,
										});
									}}
								/>
								<label className="label-sell">Event Name</label>
							</div>
							<div className="inputContainer">
								<input
									type="text"
									className="input"
									placeholder="a"
									required
									value={form.eventDate}
									onChange={(e) => {
										setForm({
											...form,
											eventDate: e.target.value,
										});
									}}
								/>
								<label className="label-sell">Event Schedule</label>
							</div>
						</div>
						<div className="div-input-container">
							<div className="inputContainer">
								<input
									type="text"
									className="input"
									placeholder="a"
									required
									value={form.contactInfo}
									onChange={(e) => {
										setForm({
											...form,
											contactInfo: e.target.value,
										});
									}}
								/>
								<label className="label-sell">Event link</label>
							</div>
							<div className="des-inputContainer">
								<textarea
									spellcheck="false"
									className="input"
									placeholder="a"
									value={form.eventInfo}
									onChange={(e) => {
										setForm({
											...form,
											eventInfo: e.target.value,
										});
									}}
								/>
								<label className="label-sell">Event Information</label>
							</div>
						</div>
						<div className="inputContainer">
							<input
								ref={inputRef}
								type="file"
								onChange={handleOnChange}
								style={{ display: "none" }}
								accept="image/*"
								multiple
							/>

							{!selectedFile && (
								<>
									<button
										className="file-btn"
										onClick={onChooseFile}
									>
										<span className="material-symbols-outlined">
											<MdOutlineFileUpload />
										</span>{" "}
										Upload File
									</button>
								</>
							)}
						</div>
						{selectedFile && (
							<>
								<div className="file-card-upload">
									<span className="material-symbols-outlined icon">
										<TbFileDescription />
									</span>

									<div className="file-info">
										{filesToShow.map((item) => {
											return (
												<div style={{ flex: 1 }}>
													<h6>{item?.name}</h6>
													<div className="progress-bg">
														<div
															className="progress"
															style={{ width: `${progress}%` }}
														/>
													</div>
												</div>
											);
										})}
										{uploadStatus === "select" ? (
											<button onClick={clearFileInput}>
												<span className="material-symbols-outlined close-icon">
													<IoIosCloseCircleOutline />
												</span>
											</button>
										) : (
											<div className="check-circle">
												{uploadStatus === "uploading" ? (
													`${progress}%`
												) : uploadStatus === "done" ? (
													<span
														className="material-symbols-outlined"
														style={{ fontSize: "20px" }}
													>
														<CiCircleCheck />
													</span>
												) : null}
											</div>
										)}
									</div>
								</div>
								<input
									type="submit"
									className="postsubmitBtn-after-upload"
									value={
										uploadStatus === "select" || uploadStatus === "uploading"
											? "Upload"
											: "Done"
									}
								/>
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
