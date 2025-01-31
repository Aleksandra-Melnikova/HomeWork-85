import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { TrackAdmin } from "../../types";
import {
  deleteAdminTrack,
  fetchAdminTracks,
  publishAdminTrack,
} from "./AdminTracksThunk.ts";

interface ITrackState {
  tracks: TrackAdmin[] | null;
  fetchLoading: boolean;
  createTrackLoading: boolean;
  deleteAdminLoading: boolean;
  publishAdminLoading: boolean;
}

const initialState: ITrackState = {
  tracks: null,
  fetchLoading: false,
  createTrackLoading: false,
  deleteAdminLoading: false,
  publishAdminLoading: false,
};

export const selectAdminTracks = (state: RootState) => state.adminTracks.tracks;

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
      .addCase(deleteAdminTrack.pending, (state) => {
        state.deleteAdminLoading = true;
      })
      .addCase(deleteAdminTrack.fulfilled, (state) => {
        state.deleteAdminLoading = false;
      })
      .addCase(deleteAdminTrack.rejected, (state) => {
        state.deleteAdminLoading = false;
      })
      .addCase(publishAdminTrack.pending, (state) => {
        state.publishAdminLoading = true;
      })
      .addCase(publishAdminTrack.fulfilled, (state) => {
        state.publishAdminLoading = false;
      })
      .addCase(publishAdminTrack.rejected, (state) => {
        state.publishAdminLoading = false;
      });
  },
});

export const tracksAdminReducer = adminTrackSlice.reducer;
