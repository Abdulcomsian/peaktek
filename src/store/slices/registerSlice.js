import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,

  isAuthenticated: false,
};
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    createUser(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { createUser } = registerSlice.actions;
export default registerSlice.reducer;
