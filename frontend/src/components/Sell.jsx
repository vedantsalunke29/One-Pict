import React, { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Sell() {
	const inputRef = useRef();
	const [selectedFile, setSelectedFile] = useState(null);
	const [filesToShow, setFilesToShow] = useState([]);
	const [progress, setProgress] = useState(0);
	const [uploadStatus, setUploadStatus] = useState("select");
	const cookieVal = Cookies.get("regIdNo");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		productName: "",
		productPrice: "",
		description: "",
		currentProductPrice: "",
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
					"https://one-pict.onrender.com/image",
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
						navigate("/your-products");
					} else {
						toast.error("Something went wrong");
						setIsLoading(false);
					}
				});
		} catch (error) {
			setUploadStatus("select");
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="conatiner-for-sell-form">
				{isLoading && <Loader />}
				<div className="main-sell-body">
					<div className="sell-title">
						<h1>Sell Product</h1>{" "}
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
										value={form.productName}
										onChange={(e) => {
											setForm({
												...form,
												productName: e.target.value,
											});
										}}
									/>
									<label className="label-sell">Product Name</label>
								</div>
								<div className="inputContainer">
									<input
										type="number"
										className="input"
										placeholder="a"
										min={0}
										required
										value={form.productPrice}
										onChange={(e) => {
											setForm({
												...form,
												productPrice: e.target.value,
											});
										}}
									/>
									<label className="label-sell">Previous Product Price</label>
								</div>
							</div>
							<div className="div-input-container">
								<div className="inputContainer">
									<input
										type="email"
										className="input"
										placeholder="a"
										required
										value={form.contactInfo}
										onChange={(e) => {
											setForm({
												...form,
												currentProductPrice: e.target.value,
											});
										}}
									/>
									<label className="label-sell">Current Product Price</label>
								</div>
								<div className="des-inputContainer">
									<textarea
										className="input"
										spellcheck="false"
										placeholder="a"
										value={form.description}
										onChange={(e) => {
											setForm({
												...form,
												description: e.target.value,
											});
										}}
									/>
									<label className="label-sell">Description</label>
								</div>
							</div>
							<div className="div-inputContainer">
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
										className="postsubmitBtn-after"
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
		</>
	);
}
