import { createSlice } from "@reduxjs/toolkit";
import { createTrack, fetchTracks } from "./tracksThunk.ts";
import { RootState } from "../../app/store.ts";
import { Track } from "../../types";

interface IProductsState {
  tracks: Track | null;
  fetchLoading: boolean;
  createTrackLoading: boolean;
}

const initialState: IProductsState = {
  tracks: null,
  fetchLoading: false,
  createTrackLoading: false,
};

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectFetchLoading = (state: RootState) =>
  state.tracks.fetchLoading;
export const selectCreateTrackLoading = (state: RootState) =>
  state.tracks.createTrackLoading;

export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchLoading = true;
        state.tracks = null;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetchLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(createTrack.pending, (state) => {
        state.createTrackLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createTrackLoading = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.createTrackLoading = false;
      });
  },
});

export const tracksReducer = trackSlice.reducer;
