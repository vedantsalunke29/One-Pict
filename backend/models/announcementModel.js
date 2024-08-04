import mongoose from "mongoose";

const announcementSchema = mongoose.Schema({
    regIdNo: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    teacherImg: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    link: {
        type: String
    },
    img:
    {
        type: Array,
        required: true,
    }
})

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;