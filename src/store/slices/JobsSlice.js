import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientBaseURL, clientEndPoints } from "@services/config";

export const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  boardData: [],
  singleJobData: {},
  seletedStatus: null,
  status: STATUS.IDLE,
};

// Create an async thunk for fetching singleJob
export const fetchSingleJob = createAsyncThunk("jobs/fetch", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await clientBaseURL.get(
      `${clientEndPoints.getSingleJob}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.job;
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
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    boardDataLoaded: (state, action) => {
      state.boardData = action.payload;
    },
    seletectedStatus: (state, action) => {
      state.seletedStatus = action.payload;
    },
    addJob: (state, action) => {
      const { id, name, address, created_at } = action.payload;
      state.boardData
        .filter((column) => column.name === "New Lead")[0]
        .tasks.push({
          id,
          content: { name, address, created_at },
        });
    },
    updateColumn: (state, action) => {
      const { updatedSourceColumn, updatedDestinationColumn } = action.payload;
      state.boardData = state.boardData.map((board) => {
        if (board.name === updatedSourceColumn.name) return updatedSourceColumn;
        if (board.name === updatedDestinationColumn.name)
          return updatedDestinationColumn;
        return board;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleJob.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.singleJobData = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchSingleJob.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const { addJob, updateColumn, boardDataLoaded, seletectedStatus } =
  jobsSlice.actions;

export default jobsSlice.reducer;
