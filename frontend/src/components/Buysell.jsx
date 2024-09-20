import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Cookies from "js-cookie";
import imageLogin from "../assets/logintosee.png";
import Marquee from "react-fast-marquee";
import back from "../assets/ecommerce.jpeg.jpg";
import randomColor from "randomcolor";
import Foot from "./Foot";
export default function Buysell() {
	const cookieVal = Cookies.get("regIdNo");
	const navigate = useNavigate();
	const color = randomColor();

	return (
		<>
			{!cookieVal && (
				<>
					<div className="main-conatiner-not-login">
						<div className="main-not-login-div">
							<div className="login-to-see">
								<Marquee>
									<h1>Please login to buy and sell products</h1>
								</Marquee>
							</div>
							<div className="image-not-login-div">
								<div className="button-for-login-page">
									<button
										onClick={() => {
											navigate("/signin");
										}}
										className="button-57"
									>
										<span>Enjoy Shopping</span>
										Login
									</button>
								</div>
								<img
									src={imageLogin}
									alt="no preview"
								/>
							</div>
						</div>
					</div>
				</>
			)}
			{cookieVal && (
				<>
					<div className="main-buysell-container-div">
						<div className="main-div-buysell">
							<div className="left-buysell-div">
								<h1>
									<TypeAnimation
										sequence={[
											`Want a good ?`,
											1000,
											"Want to sell a good ?",
											1000,
											"Wait is over !!",
											1000,
											"One pict is here 🎉🎉",
											2000,
										]}
										speed={1}
										repeat={Infinity}
										style={{
											color: color,
											fontFamily: "Roboto",
											fontSize: 35,
											fontWeight: 300,
										}}
									/>{" "}
								</h1>
								<h2>ONE PICT: Where Students Trade, Connect, and Share.</h2>
								<div className="p-present">
									<p>Present portal to buy n sell</p>
								</div>
								<div className="buy-sell-btn-div">
									<button
										onClick={() => navigate("/buy")}
										className="button-53"
									>
										Buy
									</button>
									<button
										onClick={() => navigate("/sell")}
										className="button-53"
									>
										Sell
									</button>
								</div>
							</div>
							<div className="right-buysell-div">
								<img
									src={back}
									alt="no preview"
								/>
							</div>
						</div>
					</div>
				</>
			)}

			<Foot />
		</>
	);
}
