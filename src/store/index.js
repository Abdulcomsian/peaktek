import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import JobsReducer from "./slices/JobsSlice";
import customerReducer from "./slices/customerSlice";
import registerReducer from "./slices/registerSlice";
import activeTabReducer from "./slices/activeTabSlice";
import suppliersReducer from "./slices/suppliersSlice";
import subContractorReducer from "./slices/subContractorSlice";
import usersReducer from "./slices/usersSlice";
import adjustorReducer from "./slices/adjustorSlice";
import rooferComponentReducer from "./slices/rooferComponentsSlice";
import paymentScheduleReducer from "./slices/paymentScheduleSlice";
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";

// Create a persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine the reducers you want to persist
const rootReducer = {
  jobs: persistReducer(persistConfig, JobsReducer),
  customer: customerReducer,
  login: loginReducer,
  register: registerReducer,
  activeTab: activeTabReducer,
  suppliers: suppliersReducer,
  subContractors: subContractorReducer,
  users: usersReducer,
  adjustors: adjustorReducer,
  paymentSchedule: paymentScheduleReducer,
  roofer: rooferComponentReducer,
  user: userReducer,
};

// Create the store with the root reducer
export const store = configureStore({
  reducer: rootReducer,
});

// Create a persistor
export const persistor = persistStore(store);
