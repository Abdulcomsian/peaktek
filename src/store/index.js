import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./slices/JobsSlice";
import customerReducer from "./slices/customerSlice";
import registerReducer from "./slices/registerSlice";
import activeTabReducer from "./slices/activeTabSlice";
import suppliersReducer from "./slices/suppliersSlice";
import subContractorReducer from "./slices/subContractorSlice";
import usersReducer from "./slices/usersSlice";
import adjustorReducer from "./slices/adjustorSlice";
export const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    customer: customerReducer,
    register: registerReducer,
    activeTab: activeTabReducer,
    suppliers: suppliersReducer,
    subContractors: subContractorReducer,
    users: usersReducer,
    adjustors: adjustorReducer,
  },
});
