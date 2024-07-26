import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieRecommendations = () => {
	const [recommendations, setRecommendations] = useState([]);
	const API_URL = "http://127.0.0.1:5000";
	const [movie, setMovie] = useState("");
	const fetchRecommendations = async (movie_name) => {
		try {
			await axios
				.get(`${API_URL}/recommendations/${movie_name}`)
				.then((res) => {
					if (res.length < 0) setRecommendations([]);
					else {
						setRecommendations(res.data);
					}
				})
				.catch((error) => {
					console.error("Error fetching recommendations:", error);
				});
		} catch (error) {
			throw new Error(`ERROR:${error}`);
		}
	};

	const handleRecommend = () => {
		if (movie.length == 0) setRecommendations([]);
		else fetchRecommendations(movie);
	};

	return (
		<div className="main-movie-div">
			<h1 className="movie-h1">
				Your favorite movie
				<input
					type="text"
					className="enter-movie-input"
					required
					value={movie}
					onChange={(e) => {
						setMovie(e.target.value);
					}}
				/>
				<button
					class="button-6"
					role="button"
					onClick={handleRecommend}
				>
					Submit
				</button>
			</h1>

			{recommendations.length > 0 ? (
				<>
					<h2 className="recommendations">You will also love this...</h2>
					<div className="movie">
						{recommendations.map((i) => {
							return (
								<ul className="movie-ul">
									<li key={i}>{i[0]}</li>
									<img
										src={i[1]}
										alt=""
									/>
								</ul>
							);
						})}
					</div>
				</>
			) : (
				<div className="no-recommendations">No recommendations available.</div>
			)}
		</div>
	);
};

export default MovieRecommendations;
