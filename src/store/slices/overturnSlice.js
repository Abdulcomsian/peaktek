import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientBaseURL, clientEndPoints } from "@services/config";

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  overturnData: {},
  status: STATUS.IDLE,
};

// Create an async thunk for fetching singleJob
export const fetchOverturnData = createAsyncThunk(
  "overturn/fetch",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.get(
        `${clientEndPoints.getOverturn}/${id}`,
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

const overturnSlice = createSlice({
  name: "overturn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverturnData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchOverturnData.fulfilled, (state, action) => {
        state.overturnData = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchOverturnData.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {} = overturnSlice.actions;

export default overturnSlice.reducer;
