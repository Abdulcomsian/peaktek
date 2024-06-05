import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialColumns: [
    { id: "newLead", title: "New Lead" },
    { id: "signedDeal", title: "Single Deal" },
    { id: "adjuster", title: "Adjustor" },
  ],
  initialTasks: {
    newLead: [
      { id: "task-6", content: "Task 6" },
      { id: "task-1", content: "Task 1" },
      { id: "task-2", content: "Task 2" },
    ],
    signedDeal: [{ id: "task-3", content: "Task 3" }],
    adjuster: [
      { id: "task-4", content: "Task 4" },
      { id: "task-5", content: "Task 5" },
    ],
  },
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action) => {
      const { id, content } = action.payload;
      state.initialTasks.newLead.push({ id, content });
    },
  },
});

export const { addJob } = jobSlice.actions;

export default jobSlice.reducer;

export const getTasks = (state) => {
  return state.jobs.initialTasks;
};
