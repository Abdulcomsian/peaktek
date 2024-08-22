import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientBaseURL, clientEndPoints } from "@services/config";

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  subContractorsData: [],
  status: STATUS.IDLE,
  total: 0, // Add total for pagination
};

// Create an async thunk for fetching subContractors
export const fetchSubContractors = createAsyncThunk(
  "subContractors/fetch",
  async ({ page, pageSize }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.get(
        `${clientEndPoints.getCompanySubContractors}?results=${pageSize}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        data: response?.data?.data,
        total: response?.data?.total, // Ensure the API returns the total number of subContractors
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

const subContractorSlice = createSlice({
  name: "subContractors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubContractors.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSubContractors.fulfilled, (state, action) => {
        state.subContractorsData = action.payload.data;
        state.total = action.payload.total; // Set the total count for pagination
        state.status = STATUS.IDLE;
      })
      .addCase(fetchSubContractors.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {} = subContractorSlice.actions;

export default subContractorSlice.reducer;
