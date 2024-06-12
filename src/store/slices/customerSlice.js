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
