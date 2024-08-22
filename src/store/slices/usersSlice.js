import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientBaseURL, clientEndPoints } from "@services/config";

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  usersData: [],
  status: STATUS.IDLE,
  total: 0, // For pagination
};

// Async thunk for fetching users data
export const fetchUsersData = createAsyncThunk(
  "users/fetch",
  async ({ page, pageSize }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await clientBaseURL.get(
        `${clientEndPoints.getCompanyUsers}?results=${pageSize}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        data: response?.data?.data,
        total: response?.data?.total, // Ensure the API returns the total number of users
      };
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.usersData = action.payload.data;
        state.total = action.payload.total; // Set the total count for pagination
        state.status = STATUS.IDLE;
      })
      .addCase(fetchUsersData.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export default usersSlice.reducer;
