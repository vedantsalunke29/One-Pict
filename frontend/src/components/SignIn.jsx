import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import video from "../assets/side.mp4";
import Loader from "./Loader";

export default function SignIn() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		regIdNo: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await axios
				.post("http://localhost:5000/signin", form)
				.then((res) => {
					if (res.data === "loginpass") {
						Cookies.set("regIdNo", form.regIdNo, { expires: 7 });
						toast.success("Successfully Sign In.");
						setIsLoading(false);
						navigate("/");
					} else if (res.data === "nouser") {
						toast.error("This register ID not registered");
						setIsLoading(false);
					} else if (res.data === "loginfail") {
						toast.error("Invalid Credentials");
						setIsLoading(false);
					} else if (res.data === "fail") {
						toast.error("Something went wrong!");
						setIsLoading(false);
					}
				})
				.catch((error) => {
					setIsLoading(false);
					throw new Error(`ERROR:${error}`);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};
	return (
		<>
			<div className="main-signup-body">
				{isLoading && <Loader />}
				<div className="left-video-div">
					<div className="side-video">
						<video
							autoPlay
							muted
							loop
							width="420"
							align="right"
							className="video"
						>
							<source
								src={video}
								type="video/mp4"
							/>
							Sorry, your browser doesn't support videos.
						</video>
					</div>
				</div>
				<div className="signupFrm">
					<form
						action=""
						className="form"
						onSubmit={submit}
					>
						<h1 className="title">Sign in </h1>
						<div className="inputContainer">
							<input
								type="text"
								className="input"
								placeholder="a"
								required
								value={form.regIdNo}
								onChange={(e) => {
									setForm({ ...form, regIdNo: e.target.value });
								}}
							/>
							<label
								for=""
								className="label"
							>
								Reg.ID.No./Club ID
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
								for=""
								className="label"
							>
								Password
							</label>

							<span className="forgot-pass">
								<Link
									to={"/forgot-password"}
									className="for-title"
								>
									Forgot?
								</Link>
							</span>
						</div>

						<input
							type="submit"
							className="submitBtn"
							value="Sign up"
						/>
						<span className="sign-up-redirect">
							Don't have an account?{" "}
							<Link
								to={"/signup"}
								className="link"
							>
								Sign up
							</Link>
						</span>
					</form>
				</div>
			</div>
		</>
	);
}
