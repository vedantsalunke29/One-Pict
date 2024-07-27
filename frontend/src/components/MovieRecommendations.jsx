import React, { useState } from "react";
import axios from "axios";
import { DNA } from "react-loader-spinner";

const MovieRecommendations = () => {
	const [recommendations, setRecommendations] = useState([]);
	const API_URL = "https://movie-recommendation-suz4.onrender.com";
	const [movie, setMovie] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const fetchRecommendations = async (movie_name) => {
		try {
			setIsLoading(true);
			await axios
				.get(`${API_URL}/recommendations/${movie_name}`)
				.then((res) => {
					setIsLoading(true);
					if (res.length < 0) {
						setRecommendations([]);
						setIsLoading(false);
					} else {
						setRecommendations(res.data);
						setIsLoading(false);
					}
				})
				.catch((error) => {
					setIsLoading(false);
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
				<>
					{isLoading && (
						<DNA
							visible={true}
							height="80"
							width="80"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper"
						/>
					)}
					{!isLoading && (
						<div className="no-recommendations">
							No recommendations available.
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default MovieRecommendations;
