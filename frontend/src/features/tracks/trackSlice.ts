
import { createSlice } from "@reduxjs/toolkit";
import { fetchTracks} from "./tracksThunk.ts";
import { RootState } from "../../app/store.ts";
import {Track} from "../../types";

interface IProductsState {
  tracks: Track | null;
  fetchLoading: boolean;
}

const initialState: IProductsState = {
  tracks: null,
  fetchLoading: false,
};

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectFetchLoading = (state: RootState) =>
  state.tracks.fetchLoading;


export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetchLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchLoading = false;
      })

  },
});

export const tracksReducer = trackSlice.reducer;
