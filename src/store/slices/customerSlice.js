import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerName: "",
  email: "",
  phone: "",
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: (state, action) => {
      const { customerName, email, phone } = action.payload;
      state.customerName = customerName;
      state.email = email;
      state.phone = phone;
    },
  },
});

export const { createCustomer } = customerSlice.actions;

export default customerSlice.reducer;

export const getCustomerName = (state) => {
  return state.customer.customerName;
};

// const sourceTasks = [...prevTasks[sourceColumn.id]]; // Create a copy of source tasks
// const destinationTasks = [...(prevTasks[destinationColumn.id] || [])]; // Create a copy of destination tasks, or initialize as an empty array if it doesn't exist

// const activeTaskIndex = sourceTasks.findIndex(
//   (task) => task.id === activeId
// );
// const activeTask = sourceTasks[activeTaskIndex];

// // Remove the task from the source column
// sourceTasks.splice(activeTaskIndex, 1);

// // Add the task to the destination column
// destinationTasks.push(activeTask);

// return {
//   ...prevTasks,
//   [sourceColumn.id]: sourceTasks,
//   [destinationColumn.id]: destinationTasks,
// };
