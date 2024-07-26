import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import video from "../assets/empty.mp4";
import ProductCard from "./ProductCard";

export default function YourProduct() {
	const [regIdNo, setRegIdNo] = useState(Cookies.get("regIdNo"));
	const [image, setImage] = useState([]);
	const [showCard, setShowCard] = useState(false);

	const showImage = async () => {
		try {
			await axios
				.post("https://one-pict.onrender.com/get-user-image", { regIdNo })
				.then((res) => {
					if (res.data === "nothing") setShowCard(false);
					else {
						setImage(res.data);
						setShowCard(true);
					}
				})
				.catch((error) => {
					throw new Error(`ERROR:${error}`);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};

	useEffect(
		() => {
			showImage();
		},
		[showCard],
		[],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedCookie = Cookies.get("regIdNo");
			if (updatedCookie !== regIdNo) setRegIdNo(updatedCookie);
		}, 1000);

		return () => clearInterval(interval);
	}, [regIdNo]);

	return (
		<>
			{showCard && (
				<div className="main-buy-page-main">
					<div className="title-your-product">
						<h1>Your Products</h1>
					</div>
					<div className="nonMain">
						{image.map((i) => {
							return (
								<>
									<ProductCard
										setShowCard={setShowCard}
										_id={i._id}
										name={i.productName}
										price={i.productPrice}
										imgSrc={i.img[0]}
									/>
								</>
							);
						})}
					</div>
				</div>
			)}
			{!showCard && (
				<div className="nothing-to-dis">
					<video
						autoPlay
						muted
						loop
						className="video"
					>
						<source
							src={video}
							type="video/mp4"
						/>
						Sorry, your browser doesn't support videos.
					</video>
				</div>
			)}
		</>
	);
}
