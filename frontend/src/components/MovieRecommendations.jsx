import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieRecommendations = ({ movieName }) => {
	const [recommendations, setRecommendations] = useState([]);
	const API_URL = "http://127.0.0.1:3500";

	const fetchRecommendations = async () => {
		try {
			await axios
				.get(`${API_URL}/recommendations/${movieName}`)
				.then((res) => {
					if (res.length < 0) setRecommendations([]);
					else {
						setRecommendations(res.data);
						console.log(res.data);
					}
				})
				.catch((error) => {
					console.error("Error fetching recommendations:", error);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};

	useEffect(() => {
		fetchRecommendations();
	}, [movieName]);
	return (
		<div
			className="main-movie-div"
		>
			<h2>Movie Recommendations</h2>
			{recommendations.length > 0 ? (
				<div
					className="movie"
					
				>
					{recommendations.map((i) => {
						return (
							<ul className="movie-ul">
								<li key={i}>{i}</li>
							</ul>
						);
					})}
				</div>
			) : (
				<p>No recommendations available.</p>
			)}
		</div>
	);
};

export default MovieRecommendations;
