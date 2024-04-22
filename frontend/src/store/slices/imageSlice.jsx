import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
	name: "image",
	initialState: [],
	reducers: {
		showImagetoNav(state, action) {
			if (state.length > 0) state.pop();
			state.push(action.payload);
		},
	},
});

export default imageSlice.reducer;

export const { showImagetoNav } = imageSlice.actions;
