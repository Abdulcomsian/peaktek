import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./slices/JobsSlice";
import customerReducer from "./slices/customerSlice";
import registerReducer from "./slices/registerSlice";
import activeTabReducer from "./slices/activeTabSlice";
import overturnReducer from "./slices/overturnSlice";
export const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    customer: customerReducer,
    register: registerReducer,
    activeTab: activeTabReducer,
    overturn: overturnReducer,
  },
});
