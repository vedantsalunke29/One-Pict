import { createSlice } from "@reduxjs/toolkit";

const userNameSlice = createSlice({
	name: "userName",
	initialState: [],
	reducers: {
		showNameToNav(state, action) {
			if (state.length > 0) state.pop();
			state.push(action.payload);
		},
	},
});

export default userNameSlice.reducer;

export const { showNameToNav } = userNameSlice.actions;
