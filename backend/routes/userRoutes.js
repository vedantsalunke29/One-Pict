import express from "express";
import {
    createUser,
    signinUser,
    postImage,
    getImage,
    getCurrentUserProfile,
    sendEmail,
    resetPass,
    getUserImage,
    deleteUserImage,
    getProductById,
    postUserImg,
    getUserProfileImage,
    deleteUserProfileImage,
    updateUserName,
    uploadEventInfo,
    getEventInfo,
    getEventInfoById,
    getEventInfoByRegIdNo,
    deleteEvent,
    postContactMsg,
    buyRequestToOwner,
    postDiscussMsg,
    discussInfo,
    handleLike,
    deleteDiscussion,
    replyDiscussion,
    getReply,
    getLike,
} from '../controllers/userController.js';


const router = express.Router();

router.route("/signup").post(createUser);
router.post("/signin", signinUser);
router.route("/profile").post(getCurrentUserProfile);
router.post("/send-email", sendEmail);
router.post("/resetpassword", resetPass);
router.post("/image", postImage);
router.get("/get-image", getImage);
router.post("/get-user-image", getUserImage);
router.post("/delete-user-image", deleteUserImage);
router.post("/product-info", getProductById);
router.post("/userImage-post", postUserImg);
router.post("/userImage-get", getUserProfileImage);
router.post("/userImage-delete", deleteUserProfileImage);
router.post("/userName-update", updateUserName);
router.post("/eventInfo", uploadEventInfo)
router.get("/get-eventInfo", getEventInfo);
router.post("/eventInfo-get", getEventInfoById);
router.post("/eventInfo-get-regIdNo", getEventInfoByRegIdNo);
router.post("/delete-event", deleteEvent);
router.post("/contact", postContactMsg);
router.post("/buy-request", buyRequestToOwner);
router.post("/postDiscuss", postDiscussMsg);
router.get("/get-discussion-data", discussInfo);
router.post("/handle-like", handleLike);
router.post("/delete-discussion", deleteDiscussion);
router.post("/reply-to-discussion", replyDiscussion)
router.post("/get-reply-to-discussion", getReply);
router.post("/get-like", getLike);

export default router;