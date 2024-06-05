import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./slices/JobsSlice";
export const store = configureStore({
  reducer: {
    jobs: JobsReducer,
  },
});
