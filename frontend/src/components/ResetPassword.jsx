import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
	const [cPassword, setCPassword] = useState("");
	const [password, setPassword] = useState("");
	const cookieVal = Cookies.get("resetRegister");
	const navigate = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		try {
			if (password.length < 8) toast.error("Password less than 8 character");
			else if (password !== cPassword)
				toast.error("Password and Confirm Password does not match!!");
			else {
				await axios
					.post("https://one-pict.onrender.com/resetpassword", {
						cookieVal,
						password,
					})
					.then((res) => {
						if (res.data === "pass") {
							Cookies.remove("resetRegister");
							toast.success("Password changed successfully");
							navigate("/signin");
						} else if (res.data === "fail")
							toast.error("Something went wrong!!");
					})
					.catch((error) => {
						throw new Error(`ERROR:${error}`);
					});
			}
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};
	return (
		<>
			<div className="main-reset-body">
				<div className="resetFrm">
					<form
						action=""
						class="form"
						onSubmit={submit}
					>
						<h1 className="title">Reset Password </h1>

						<div className="inputContainer">
							<input
								type="password"
								className="input"
								required
								placeholder="a"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<label
								for=""
								className="label"
							>
								New Password
							</label>
						</div>

						<div className="inputContainer">
							<input
								type="password"
								className="input"
								required
								placeholder="a"
								value={cPassword}
								onChange={(e) => {
									setCPassword(e.target.value);
								}}
							/>
							<label
								for=""
								className="label"
							>
								Confirm Password
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
		</>
	);
}
