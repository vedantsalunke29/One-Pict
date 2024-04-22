import mongoose from "mongoose";

const userImageSchema = mongoose.Schema({
    regIdNo: {
        type: String,
        required: true,
        unique: true
    },
    userImg: {
        type: String,
        required: true,
    }
})

const userImage = mongoose.model("userImage", userImageSchema);

export default userImage;