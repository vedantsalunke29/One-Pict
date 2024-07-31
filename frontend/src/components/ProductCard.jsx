import React, { useState } from "react";
import { motion } from "framer-motion";
import Img from "./Img";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Loader from "./Loader";

function ProductCard({
	_id,
	name,
	price,
	imgSrc,
	description,
	contactInfo,
	setShowCard,
}) {
	const [showDelete, setShowDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const deleteHandle = async () => {
		try {
			setIsLoading(true);

			await axios
				.post("http://localhost:5000/delete-user-image", {
					_id,
				})
				.then((res) => {
					if (res.data === "success") {
						toast.success("Successfully Deleted");
						setIsLoading(false);
						setShowCard(false);
					} else {
						setIsLoading(false);
						toast.error("Can't Delete");
					}
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`ERROR:${error}`);
		}
	};
	return (
		<>
			{isLoading && <Loader />}
			<motion.div
				className="productCard"
				key={_id}
				onClick={() => setShowDelete(!showDelete)}
			>
				<Img img={imgSrc} />

				<div className="inner-productCard">
					<p>{name}</p>
					<h4>
						<span>₹</span>
						{price}
					</h4>
				</div>
				{showDelete && (
					<div
						className="delete-btn"
						onClick={deleteHandle}
					>
						<AiFillDelete />
					</div>
				)}
			</motion.div>
		</>
	);
}

export default ProductCard;
