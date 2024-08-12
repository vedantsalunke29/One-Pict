import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Img from "./Img";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Buy() {
	const [productItem, setProductItem] = useState([]);
	const [showCard, setShowCard] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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
			setIsLoading(true);
			setShowCard(!showCard);
			await axios
				.get("https://one-pict.onrender.com/get-image")
				.then((res) => {
					if (res.data === "nothing") {
						setShowCard(false);
						setIsLoading(false);
					} else {
						setProductItem(res.data);
						setIsLoading(false);
					}
				})
				.catch((error) => {
					setIsLoading(false);
					console.log(error);
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`ERROR:${error}`);
		}
	};
	useEffect(() => {
		getImageData();
	}, []);

	return (
		<>
			{isLoading && <Loader />}
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
											price={i.currentProductPrice}
											imgSrc={i.img[0]}
										/>
									</>
								);
							})}
						</div>
					</div>
				</>
			)}
			{!showCard && <h1 className="no-product">No Product</h1>}
		</>
	);
}
