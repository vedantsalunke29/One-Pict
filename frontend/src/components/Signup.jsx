import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { easeIn, motion } from "framer-motion";
import Cookies from "js-cookie";

export default function Signup() {
	const [form, setForm] = useState({
		regIdNo: "",
		name: "",
		email: "",
		password: "",
		cPassword: "",
		otp: "",
	});
	const [isClicked, setIsClicked] = useState("Student");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [otpValue, setOtpValue] = useState("");
	const [showPop, setShowPop] = useState(false);
	const digits = "0123456789";

	const handleOtpChange = (e) => {
		setOtpValue(e.target.value);
	};
	const otpCheck = () => {
		if (form.otp !== otpValue) toast.error("Invalid Code");
		else {
			Cookies.set("resetRegister", form.regIdNo);
			toast.success("Successfully Sign Up.");
			navigate("/signin");
		}
	};

	const submit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			let OTP = "";
			for (let i = 0; i < 6; i++) {
				OTP += digits[Math.floor(Math.random() * 10)];
			}
			form.otp = OTP;
			if (form.password.length < 8) {
				toast.error("Password less than 8 character");
				setIsLoading(false);
			} else if (form.password !== form.cPassword) {
				toast.error("Password and Confirm Password does not match!!");
				setIsLoading(false);
			} else if (form.regIdNo.includes("T") && isClicked !== "Teacher") {
				toast.error("Please Select Teacher Section");
				setIsLoading(false);
			} else if (form.regIdNo.includes("CB") && isClicked !== "Club") {
				toast.error("Please Select Club Section");
				setIsLoading(false);
			} else if (
				/^[ICE]/.test(form.regIdNo) &&
				!form.regIdNo.includes("CB") &&
				isClicked !== "Student"
			) {
				toast.error("Please Select Student Section");
				setIsLoading(false);
			} else {
				await axios
					.post("http://localhost:5000/signup", form)
					.then((res) => {
						if (res.data === "provide") {
							toast.error("Provide All Inputs");
							setIsLoading(false);
						}
						if (res.data === "exits") {
							toast.error("User already exists.");
							setIsLoading(false);
						} else if (res.data === "create") {
							setIsLoading(false);
							toast.success("Code send successfully to registered gmail");
							setShowPop(true);
						} else if (res.data === "not") {
							toast.error("Invalid Credential.");
							setIsLoading(false);
						}
					})
					.catch((error) => {
						setIsLoading(false);
						throw new Error(`ERROR:${error}`);
					});
			}
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};
	return (
		<>
			<div className="main-signup-body">
				{isLoading && <Loader />}
				{showPop && (
					<div className="main-verification-div">
						<motion.div
							className="pop-code"
							animate={{ y: [200, 0], opacity: [0, 0, 1] }}
							transition={{ duration: 1.5, ease: easeIn }}
						>
							<h1 className="pop-title">Enter Verfication Code</h1>
							<div className="inputContainer">
								<input
									type="text"
									className="input"
									placeholder="a"
									required
									value={otpValue}
									onChange={handleOtpChange}
								/>
								<label
									htmlFor=""
									className="label"
								>
									Verification Code
								</label>
							</div>
							<input
								type="submit"
								className="submitBtn"
								value="Verify"
								onClick={otpCheck}
							/>
						</motion.div>
					</div>
				)}
				{!showPop && (
					<div className="next-main-extra-sign-up">
						<div className="title-logo-div">
						<img src={logo} alt="" />
						<h1 className="title">Sign up </h1>
						</div>
						<form
							action=""
							className="form"
							onSubmit={submit}
						>
							<ul className="info-about-sign-ul">
								<li
									onClick={() => {
										setIsClicked("Student");
									}}
									className={isClicked === "Student" ? "is-active-li" : ""}
								>
									Student
								</li>
								<li
									onClick={() => {
										setIsClicked("Club");
									}}
									className={isClicked === "Club" ? "is-active-li" : ""}
								>
									Club
								</li>
								<li
									onClick={() => {
										setIsClicked("Teacher");
									}}
									className={isClicked === "Teacher" ? "is-active-li" : ""}
								>
									Teacher
								</li>
							</ul>
							<div className="inputContainer">
								<input
									type="text"
									className="input"
									placeholder="a"
									required
									value={form.regIdNo}
									onChange={(e) => {
										setForm({
											...form,
											regIdNo: e.target.value.toUpperCase(),
										});
									}}
								/>
								<label
									htmlFor=""
									className="label"
								>
									{isClicked === "Student" && <>Reg.ID.No.</>}
									{isClicked === "Club" && <>Club.ID.No.</>}
									{isClicked === "Teacher" && <>Emp.No.</>}
								</label>
							</div>

							<div className="inputContainer">
								<input
									type="text"
									className="input"
									placeholder="a"
									required
									value={form.name}
									onChange={(e) => {
										setForm({
											...form,
											name: e.target.value,
										});
									}}
								/>
								<label
									htmlFor=""
									className="label"
								>
									Name
								</label>
							</div>

							<div className="inputContainer">
								<input
									type="email"
									className="input"
									placeholder="a"
									required
									value={form.email}
									onChange={(e) => {
										setForm({
											...form,
											email: e.target.value,
										});
									}}
								/>
								<label
									htmlFor=""
									className="label"
								>
									College Email
								</label>
							</div>

							<div className="inputContainer">
								<input
									type="password"
									className="input"
									required
									placeholder="a"
									value={form.password}
									onChange={(e) => {
										setForm({ ...form, password: e.target.value });
									}}
								/>
								<label
									htmlFor=""
									className="label"
								>
									Password
								</label>
							</div>

							<div className="inputContainer">
								<input
									type="password"
									className="input"
									required
									placeholder="a"
									value={form.cPassword}
									onChange={(e) => {
										setForm({ ...form, cPassword: e.target.value });
									}}
								/>
								<label
									htmlFor=""
									className="label"
								>
									Confirm Password
								</label>
							</div>

							<input
								type="submit"
								className="submitBtn"
								value="Sign up"
							/>
							<span className="sign-up-redirect">
								Already have an account?{" "}
								<Link
									to={"/signin"}
									className="link"
								>
									Sign in
								</Link>
							</span>
						</form>
					</div>
				)}
			</div>
		</>
	);
}
