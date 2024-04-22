import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Img from "./Img";
import axios from "axios";
import { FaExpand } from "react-icons/fa";
import video from "../assets/empty.mp4";
import { useNavigate } from "react-router-dom";

export default function Buy() {
	const [productItem, setProductItem] = useState([]);
	const [showCard, setShowCard] = useState(false);

	const navigate = useNavigate();

	const showPage = (id) => {
		sessionStorage.setItem("ProductInfo", JSON.stringify(id));
		navigate("/product-page");
	};

	const ProductCard = ({ id, name, price, imgSrc }) => {
		return (
			<>
				<motion.div
					className="productCard"
					key={id}
					onClick={() => showPage(id)}
				>
					<div className="buy-image-div">
						<Img img={imgSrc} />
					</div>
					<div className="inner-productCard">
						<p>{name}</p>
						<h4>
							<span>₹</span>
							{price}
						</h4>
					</div>
				</motion.div>
			</>
		);
	};

	const getImageData = async () => {
		try {
			await axios
				.get("http://localhost:5000/get-image")
				.then((res) => {
					if (res.data === "nothing") setShowCard(false);
					else {
						setProductItem(res.data);
						setShowCard(!showCard);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};
	useEffect(() => {
		getImageData();
	}, []);

	return (
		<>
			{showCard && (
				<>
					{" "}
					<div className="main-buy-page-main">
						<div className="title-buy-page">
							<h1>Products</h1>
						</div>
						<div className="nonMain">
							{productItem.map((i) => {
								return (
									<>
										<ProductCard
											id={i._id}
											name={i.productName}
											price={i.productPrice}
											imgSrc={i.img[0]}
										/>
									</>
								);
							})}
						</div>
					</div>
				</>
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
