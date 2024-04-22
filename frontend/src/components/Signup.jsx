import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import video from "../assets/signup.mp4";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Signup() {
	const [form, setForm] = useState({
		regIdNo: "",
		name: "",
		password: "",
		cPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const submit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (form.password.length < 8) {
				toast.error("Password less than 8 character");
				setIsLoading(false);
			} else if (form.password !== form.cPassword) {
				toast.error("Password and Confirm Password does not match!!");
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
							toast.success("Successfully Sign Up.");
							setIsLoading(false);

							navigate("/signin");
						} else if (res.data === "not") {
							toast.error("Reg. ID Invalid.");
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

				<div class="signupFrm">
					<form
						action=""
						className="form"
						onSubmit={submit}
					>
						<h1 className="title">Sign up </h1>

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
								type="text"
								className="input"
								placeholder="a"
								required
								value={form.name}
								onChange={(e) => {
									setForm({ ...form, name: e.target.value });
								}}
							/>
							<label
								for=""
								className="label"
							>
								Name
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
								for=""
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
			</div>
		</>
	);
}
