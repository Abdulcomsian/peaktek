import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "summary",
};

const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
