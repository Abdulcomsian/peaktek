import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardData: [],
};

export const jobSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    boardDataLoaded: (state, action) => {
      console.log("PAYLOAD", action.payload);
      state.boardData = action.payload;
    },
    addJob: (state, action) => {
      console.log("PAYLOAD FROM STORE", action.payload);
      const { id, name, address, created_at } = action.payload;
      state.boardData
        .filter((column) => column.name === "New Lead")[0]
        .tasks.push({
          id,
          content: { name, address, created_at },
        });
    },
  },
});

export const { addJob, boardDataLoaded } = jobSlice.actions;

export default jobSlice.reducer;
