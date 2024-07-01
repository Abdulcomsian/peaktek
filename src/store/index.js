import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./slices/JobsSlice";
import customerReducer from "./slices/customerSlice";
import registerReducer from "./slices/registerSlice";
export const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    customer: customerReducer,
    register: registerReducer,
  },
});
