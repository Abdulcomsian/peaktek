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
  total: 0, // Add total for pagination
};

// Create an async thunk for fetching suppliers
export const fetchSupplierData = createAsyncThunk(
  "suppliers/fetch",
  async ({ page, pageSize }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.get(
        `${clientEndPoints.getCompanySuppliers}?results=${pageSize}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        data: response?.data?.data,
        total: response?.data?.total, // Ensure the API returns the total number of suppliers
      };
    } catch (error) {
      if (error?.response) {
        console.error(
          error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Something went wrong!"
        );
      }
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
        state.supplierData = action.payload.data;
        state.total = action.payload.total; // Set the total count for pagination
        state.status = STATUS.IDLE;
      })
      .addCase(fetchSupplierData.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {} = suppliersSlice.actions;

export default suppliersSlice.reducer;
