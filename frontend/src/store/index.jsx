import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./slices/imageSlice";
import userNameSlice from "./slices/userNameSlice";

const store = configureStore({
	reducer: {
		image: imageSlice,
		userName:userNameSlice,
	},
});

export default store;
