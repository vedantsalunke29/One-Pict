import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Announcement() {
	const inputRef = useRef();
	const [selectedFile, setSelectedFile] = useState(null);
	const [filesToShow, setFilesToShow] = useState([]);
	const [progress, setProgress] = useState(0);
	const [uploadStatus, setUploadStatus] = useState("select");
	const cookieVal = Cookies.get("regIdNo");
	const [notify, setNotify] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		title: "",
		message: "",
		link: "",
		img: [],
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

				form.img.push(imgSrc);
			};
			filesToShow.push(file);
			reader.readAsDataURL(file);
		};
		if (files.length > 6) {
			toast.error("Max 6 images are allowed");
			clearFileInput();
		} else if (files) {
			Array.prototype.forEach.call(files, readAndPreview);
		}
		setSelectedFile(e.target.files[0]);
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
		setIsLoading(true);
		if (uploadStatus === "done") {
			clearFileInput();
			return;
		}

		try {
			setUploadStatus("uploading");

			await axios
				.post(
					"http://localhost:5000/announcement-add",
					{ form, cookieVal, notify },
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
					if (res.data) {
						setUploadStatus("done");
						toast.success("Uploaded successfully!!");
						navigate("/view-announcement");
					} else {
						toast.error("Something went wrong");
						setIsLoading(false);
					}
				});
		} catch (error) {
			setUploadStatus("select");
		}
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className="announcement-main-container-div">
				<div className="title-for-announcement-page">Post Announcement</div>
				<form
					className="form-for-announcement"
					onSubmit={submit}
				>
					<input
						type="text"
						placeholder="Title"
						value={form.tile}
						required
						onChange={(e) => {
							setForm({ ...form, title: e.target.value });
						}}
					/>
					<textarea
						placeholder="Message"
						value={form.message}
						onChange={(e) => {
							setForm({ ...form, message: e.target.value });
						}}
					/>
					<input
						type="text"
						placeholder="Link"
						value={form.link}
						onChange={(e) => {
							setForm({ ...form, link: e.target.value });
						}}
					/>
					<div className="file-select-upload-main-div">
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
							<div className="file-card">
								<span className="material-symbols-outlined icon">
									<TbFileDescription />
								</span>

								<div className="file-info">
									{filesToShow.map((item,index) => {
										return (
											<div style={{ flex: 1 }} key={index}>
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
						</>
					)}
					<div className="notify-student-div-wrap">
						Notify Students through email
						<div className="checkbox-wrapper-34">
							<input
								className="tgl tgl-ios"
								id="toggle-34"
								type="checkbox"
								onClick={() => {
									setNotify(!notify);
								}}
							/>
							<label
								className="tgl-btn"
								htmlFor="toggle-34"
							></label>
						</div>
					</div>
					<button
						className="button-8"
						role="button"
						type="submit"
					>
						Post
					</button>
				</form>
			</div>
		</>
	);
}
