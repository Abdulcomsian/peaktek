import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientBaseURL, clientEndPoints } from "@services/config";

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  adjustorData: [],
  status: STATUS.IDLE,
  total: 0, // Add total for pagination
};

// Create an async thunk for fetching suppliers
export const fetchAdjustorData = createAsyncThunk(
  "adjustors/fetch",
  async ({ page, pageSize }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.get(
        `${clientEndPoints.getCompanyAdjustors}?results=${pageSize}&page=${page}`,
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

const adjustorSlice = createSlice({
  name: "adjustors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdjustorData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAdjustorData.fulfilled, (state, action) => {
        state.adjustorData = action.payload.data;
        state.total = action.payload.total; // Set the total count for pagination
        state.status = STATUS.IDLE;
      })
      .addCase(fetchAdjustorData.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {} = adjustorSlice.actions;

export default adjustorSlice.reducer;
