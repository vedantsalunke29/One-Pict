import React, { useState, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import axios from "axios";
import Img from "./Img";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { BsReplyAllFill } from "react-icons/bs";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import Cookies from "js-cookie";
import vi from "timeago.js/lib/lang/vi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showNameToNav } from "../store/slices/userNameSlice";
import { DNA } from "react-loader-spinner";

timeago.register("vi", vi);

export default function DiscussionCard({ item }) {
	const [showUserImg, setShowUserImg] = useState(false);
	const [data, setData] = useState([]);
	const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState(item.like);
	const _id = item._id;
	const [regIdNo, setRegIdNo] = useState(Cookies.get("regIdNo"));
	const date = new Date(item.date);
	const [replyInput, setReplyInput] = useState(true);
	const [replyOutput, setReplyOutput] = useState(false);
	const [replyMsg, setReplyMsg] = useState("");
	const [showReply, setShowReply] = useState(false);
	const replyArray = item.replyBy;
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const handleClick = () => {
		setLiked(!liked);
	};

	const handleLike = async (count) => {
		try {
			await axios
				.post("https://one-pict.onrender.com/handle-like", {
					count,
					_id,
					regIdNo,
				})
				.then((res) => {
					if (res.data.message === "done") setLikes(res.data.contain);
				});
		} catch (error) {
			throw new Error(`Error : ${error}`);
		}
	};

	const deleteDiscussion = async () => {
		try {
			await axios.post("https://one-pict.onrender.com/delete-discussion", {
				_id,
				replyArray,
			});
		} catch (error) {
			throw new Error(`Error : ${error}`);
		}
	};

	const submitReply = async () => {
		try {
			setIsLoading(true);

			await axios
				.post("https://one-pict.onrender.com/reply-to-discussion", {
					_id,
					regIdNo,
					replyMsg,
					replyArray,
				})
				.then((res) => {
					if (res.data.message === "done") {
						toast.success("success");
						setReplyInput(false);
						dispatch(showNameToNav(replyInput));
						setData(res.data.contain);
						setShowReply(true);
						setIsLoading(false);
					}
					setIsLoading(false);
				});
		} catch (error) {
			setIsLoading(false);
			throw new Error(`Error : ${error}`);
		}
	};

	const getReply = async () => {
		try {
			setIsLoading(true);
			await axios
				.post("https://one-pict.onrender.com/get-reply-to-discussion", {
					replyArray,
					_id,
				})
				.then((res) => {
					if (res.data === "fail") {
						setShowReply(false);
						setIsLoading(false);
					} else {
						setData(res.data);
						setShowReply(true);
						setIsLoading(false);
					}
				});
		} catch (error) {
			setShowReply(false);
			setIsLoading(false);
			throw new Error(`Error : ${error}`);
		}
	};

	const handleReply = () => {
		setReplyOutput(!replyOutput);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedCookie = Cookies.get("regIdNo");
			if (updatedCookie !== regIdNo) setRegIdNo(updatedCookie);
		}, 1000);

		return () => clearInterval(interval);
	}, [regIdNo]);

	useEffect(() => {
		if (item.userImg === "notexist") setShowUserImg(false);
		else setShowUserImg(true);
		if (replyArray.length) getReply();
	}, [item]);

	useEffect(() => {
		if (
			item.like &&
			item.likeBy.find((ID) => {
				return ID === regIdNo;
			})
		)
			setLiked(true);

		if (new Date().valueOf() - date.valueOf() > 241920000) deleteDiscussion();
	}, []);

	return (
		<>
			<div className="main-container-for-post">
				<div className="uploader-info-div">
					{showUserImg && <Img img={item.userImg} />}
					{!showUserImg && <VscAccount />}
					<div className="uploader-inner-info-div">
						<h3>{item.name}</h3>
						<p>
							<TimeAgo datetime={item.date} />
						</p>
					</div>
				</div>
				<div className="uploader-message-div">
					<h2>{item.discussMsg}</h2>
				</div>
				<div className="lower-uploader-like-reply-div">
					<div className="like-div">
						<p> {likes}</p>
						{!liked && (
							<>
								<FcLikePlaceholder
									onClick={() => {
										handleClick();
										handleLike(1);
									}}
								/>
							</>
						)}
						{liked && (
							<>
								<FcLike
									onClick={() => {
										handleClick();
										handleLike(-1);
									}}
								/>
							</>
						)}
					</div>
					<div
						className="reply-div"
						onClick={handleReply}
					>
						<p> {item.reply}</p>
						<BsReplyAllFill />
					</div>
				</div>
				{replyOutput && (
					<div className="main-reply-container-div">
						{replyInput && (
							<div className="main-reply-input-take-div">
								<textarea
									value={replyMsg}
									onChange={(e) => {
										setReplyMsg(e.target.value);
									}}
									className="input-new-discuss"
								></textarea>
								<button
									className="button-27"
									onClick={submitReply}
								>
									Submit
								</button>
							</div>
						)}
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
						{showReply && (
							<div className="reply-contain-div">
								{data.map((item) => {
									return (
										<DiscussionCard
											item={item}
											key={item._id}
										/>
									);
								})}
							</div>
						)}
						{!showReply && !isLoading && (
							<h1 className="no-reply-div">No reply</h1>
						)}
					</div>
				)}
			</div>
		</>
	);
}
