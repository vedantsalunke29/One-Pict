import React from "react";
import logo from "../assets/logo.png";
export default function Loader() {
	return (
		<div className="spinner-container">
			<div className="loading-spinner">
				<img
					src={logo}
					alt="failed"
				/>
			</div>
		</div>
	);
}
