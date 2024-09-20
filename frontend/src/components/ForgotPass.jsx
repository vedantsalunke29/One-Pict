import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { easeIn, motion } from "framer-motion";
import Loader from "./Loader";

export default function ForgotPass() {
	const [form, setForm] = useState({
		regIdNo: "",
		otp: "",
	});

	const navigate = useNavigate();

	const [otpValue, setOtpValue] = useState("");
	const [showPop, setShowPop] = useState(false);
	const digits = "0123456789";
	const [isLoading, setIsLoading] = useState(false);

	const handleOtpChange = (e) => {
		setOtpValue(e.target.value);
	};
	const otpCheck = () => {
		if (form.otp !== otpValue) toast.error("Invalid Code");
		else {
			Cookies.set("resetRegister", form.regIdNo);
			toast.success("Verified");
			navigate("/reset-password");
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

			await axios
				.post("http://localhost:5000/send-email", form)
				.then((res) => {
					if (res.data === "pass") {
						setIsLoading(false);
						toast.success("Code send successfully to registered gmail");
						setShowPop(true);
					} else if (res.data === "notexist") {
						toast.error("This register ID not registered!!");
						setIsLoading(false);
					} else if (res.data === "fail") {
						setIsLoading(false);
						toast.error("Something went wrong!!");
					}
				})
				.catch((error) => {
					setIsLoading(false);
					throw new Error(`ERROR:${error}`);
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`ERROR:${error}`);
		}
	};
	return (
		<>
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
				<div className="main-reset-body">
					<div className="resetFrm">
						<form
							action=""
							className="form"
							onSubmit={submit}
						>
							<h1 className="title">Forgot Password </h1>
							<div className="inputContainer">
								<input
									type="text"
									className="input"
									placeholder="a"
									required
									value={form.regIdNo}
									onChange={(e) => {
										setForm({ ...form, regIdNo: e.target.value.toUpperCase() });
									}}
								/>
								<label
									htmlFor=""
									className="label"
								>
									Reg.ID.No.
								</label>
							</div>
							<input
								type="submit"
								className="submitBtn"
								value="Submit"
							/>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
