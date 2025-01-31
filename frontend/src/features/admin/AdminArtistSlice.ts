import { createSlice } from "@reduxjs/toolkit";
import {fetchAdminArtists} from "./AdminArtistsThunk.ts";
import { RootState } from "../../app/store.ts";
import { Artist } from "../../types";

interface IProductsState {
  artists: Artist[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IProductsState = {
  artists: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectAdminArtists = (state: RootState) => state.adminArtist.artists;


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

  },
});

export const adminArtistsReducer = adminArtistSlice.reducer;
