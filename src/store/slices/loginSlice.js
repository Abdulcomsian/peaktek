import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { saveUser } = loginSlice.actions;
export default loginSlice.reducer;
