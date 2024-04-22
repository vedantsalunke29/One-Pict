import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    regIdNo: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: String,
        required: true,
    },
    eventInfo: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    eventImg: {
        type: Array,
        required: true,
    },
});

const Events = mongoose.model("Events", eventSchema);

export default Events;