import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdminArtist,
  fetchAdminArtists,
  publishAdminArtist,
} from "./AdminArtistsThunk.ts";
import { RootState } from "../../app/store.ts";
import { Artist } from "../../types";

interface IProductsState {
  artists: Artist[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteAdminLoading: boolean;
  publishAdminLoading: boolean;
}

const initialState: IProductsState = {
  artists: [],
  fetchLoading: false,
  createLoading: false,
  deleteAdminLoading: false,
  publishAdminLoading: false,
};

export const selectAdminArtists = (state: RootState) =>
  state.adminArtist.artists;

export const adminArtistSlice = createSlice({
  name: "admin/artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAdminArtists.fulfilled, (state, { payload: artists }) => {
        state.fetchLoading = false;
        state.artists = artists;
      })
      .addCase(fetchAdminArtists.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(deleteAdminArtist.pending, (state) => {
        state.deleteAdminLoading = true;
      })
      .addCase(deleteAdminArtist.fulfilled, (state) => {
        state.deleteAdminLoading = false;
      })
      .addCase(deleteAdminArtist.rejected, (state) => {
        state.deleteAdminLoading = false;
      })
      .addCase(publishAdminArtist.pending, (state) => {
        state.publishAdminLoading = true;
      })
      .addCase(publishAdminArtist.fulfilled, (state) => {
        state.publishAdminLoading = false;
      })
      .addCase(publishAdminArtist.rejected, (state) => {
        state.publishAdminLoading = false;
      });
  },
});

export const adminArtistsReducer = adminArtistSlice.reducer;
