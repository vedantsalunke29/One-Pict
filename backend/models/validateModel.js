import mongoose from "mongoose";

const validatingUser = mongoose.Schema({
    regIdNo: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Validate = mongoose.model("Validate", validatingUser)

export default Validate;