import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientBaseURL, clientEndPoints } from "@services/config";

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  supplierData: [],
  status: STATUS.IDLE,
};

// Create an async thunk for fetching singleJob
export const fetchSupplierData = createAsyncThunk(
  "suppliers/fetch",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.get(
        `${clientEndPoints.getCompanySuppliers}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data?.data;
    } catch (error) {
      if (error?.response) {
        console.error(
          error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Something went wrong!"
        );
      }
      throw error;
    }
  }
);

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSupplierData.fulfilled, (state, action) => {
        state.supplierData = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchSupplierData.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {} = suppliersSlice.actions;

export default suppliersSlice.reducer;
