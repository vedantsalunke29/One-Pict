import mongoose from "mongoose";

const discussSchema = mongoose.Schema({
    date: Date,
    regIdNo: {
        type: String,
        required: true
    },
    discussMsg: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userImg: {
        type: String,
        required: true,
    }
    ,
    like: Number,
    likeBy: Array,
    reply: Number,
    replyBy: Array,
    repliedTo: String,
})


const Discuss = mongoose.model("Discuss", discussSchema)

export default Discuss;