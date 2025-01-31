import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import {TrackAdmin} from "../../types";
import {fetchAdminTracks} from "./AdminTracksThunk.ts";

interface ITrackState {
  tracks: TrackAdmin[] | null;
  fetchLoading: boolean;
  createTrackLoading: boolean;
}

const initialState: ITrackState = {
  tracks: null,
  fetchLoading: false,
  createTrackLoading: false,
};

export const selectAdminTracks = (state: RootState) => state.adminTracks.tracks;
// export const selectFetchLoading = (state: RootState) =>
//   state.tracks.fetchLoading;
// export const selectCreateTrackLoading = (state: RootState) =>
//   state.tracks.createTrackLoading;

export const adminTrackSlice = createSlice({
  name: "admin/tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTracks.pending, (state) => {
        state.fetchLoading = true;
        state.tracks = null;
      })
      .addCase(fetchAdminTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetchLoading = false;
        state.tracks = tracks;
      })
      .addCase(fetchAdminTracks.rejected, (state) => {
        state.fetchLoading = false;
      })
      // .addCase(createTrack.pending, (state) => {
      //   state.createTrackLoading = true;
      // })
      // .addCase(createTrack.fulfilled, (state) => {
      //   state.createTrackLoading = false;
      // })
      // .addCase(createTrack.rejected, (state) => {
      //   state.createTrackLoading = false;
      // });
  },
});

export const tracksAdminReducer = adminTrackSlice.reducer;
