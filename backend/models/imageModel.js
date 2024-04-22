import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    regIdNo: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    img:
    {
        type: Array,
        required: true,
    }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;