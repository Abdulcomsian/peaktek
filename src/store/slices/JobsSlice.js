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
    updateTasks: (state, action) => {
      const { sourceColumnId, destinationColumnId, activeId, overId } =
        action.payload;

      // Find source and destination tasks
      const sourceTasks = state.initialTasks[sourceColumnId];
      const destinationTasks = state.initialTasks[destinationColumnId];

      console.log(sourceTasks, destinationTasks);

      // Find active task in source tasks
      const activeTaskIndex = sourceTasks.findIndex(
        (task) => task.id === activeId
      );
      const activeTask = sourceTasks[activeTaskIndex];

      // Remove active task from source tasks
      sourceTasks.splice(activeTaskIndex, 1);

      // Add active task to destination tasks
      destinationTasks.push(activeTask);

      // Update state with modified tasks
      state.initialTasks[sourceColumnId] = sourceTasks;
      state.initialTasks[destinationColumnId] = destinationTasks;
    },
  },
});

export const { addJob, updateTasks } = jobSlice.actions;

export default jobSlice.reducer;

export const getTasks = (state) => {
  return state.jobs.initialTasks;
};
