import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTrackHistory, fetchTrackHistory} from "./trackHistoryThunk.ts";
import { RootState } from "../../app/store.ts";
import {TrackHistory} from "../../types";

interface IProductsState {
  trackHistory: TrackHistory[] | null;
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IProductsState = {
  trackHistory: null,
  fetchLoading: false,
  createLoading: false,
};

export const selectTracksHistory = (state: RootState) => state.trackHistory.trackHistory;
export const selectFetchLoading = (state: RootState) =>
  state.trackHistory.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
    state.trackHistory.createLoading;

export const trackHistorySlice = createSlice({
  name: "trackHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, action: PayloadAction<TrackHistory[]>) => {
        state.fetchLoading = false;
        state.trackHistory = action.payload;
      })
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.fetchLoading = false;
      })
        .addCase(createTrackHistory.pending, (state) => {
      state.fetchLoading = true;
    })
        .addCase(createTrackHistory.fulfilled, (state) => {
          state.fetchLoading = false;
        })
        .addCase(createTrackHistory.rejected, (state) => {
          state.fetchLoading = false;
        });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
