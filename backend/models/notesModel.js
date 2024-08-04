import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    regIdNo: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    subName: {
        type: String,
        required: true
    },
    section1: {
        type: String,
        required: true
    },
    addLi1: {
        type: Array,
        required: true,
    },
    section2: {
        type: String,
    },
    addLi2: {
        type: Array,
    }

})

const Note = mongoose.model("Note", noteSchema)

export default Note;