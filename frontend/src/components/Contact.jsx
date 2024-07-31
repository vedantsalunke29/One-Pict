import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Contact() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await axios.post("http://localhost:5000/contact", form).then((res) => {
				if (res.data === "done") {
					toast.success("Message Sent");
					navigate("/");
					setIsLoading(false);
				} else {
					setIsLoading(false);
					toast.error("Something went wrong !!");
				}
			});
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className="main-contact-container">
				<div className="left-contact-main-div">
					<h2>We love hearing from our community !</h2>
					<p>
						If you have any questions, suggestions, or just want to say hello,
						feel free to reach out to us.
					</p>
				</div>
				<div className="right-contact-main-div">
					<div className="contact-form">
						<form
							action=""
							className="form"
							onSubmit={submit}
						>
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
									type="email"
									className="input"
									placeholder="a"
									required
									value={form.email}
									onChange={(e) => {
										setForm({ ...form, email: e.target.value });
									}}
								/>
								<label
									for=""
									className="label"
								>
									Email
								</label>
							</div>
							<div className="contact-inputContainer">
								<textarea
									className="input"
									placeholder="a"
									required
									value={form.message}
									onChange={(e) => {
										setForm({ ...form, message: e.target.value });
									}}
								/>
								<label
									for=""
									className="label"
								>
									Message
								</label>
							</div>
							<input
								type="submit"
								className="button-89"
								value="Submit"
							/>
						</form>
					</div>
				</div>
				<div className="end-div-greet">
					<p>
						Thank you for being part of the ONE PICT community. Let's connect,
						share, and thrive together
					</p>
					<p>onepict@gmail.com.</p>
				</div>
			</div>
		</>
	);
}
