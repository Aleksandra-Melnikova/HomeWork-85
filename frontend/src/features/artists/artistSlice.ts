import { createSlice } from "@reduxjs/toolkit";
import {createArtist, fetchArtists} from "./artistsThunk.ts";
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

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectFetchLoading = (state: RootState) =>
  state.artists.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
    state.artists.createLoading;

export const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.fetchLoading = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      })
     .addCase(createArtist.pending, (state) => {
      state.createLoading = true;
    })
        .addCase(createArtist.fulfilled, (state) => {
          state.createLoading = false;
        })
        .addCase(createArtist.rejected, (state) => {
          state.createLoading = false;
        });
  },
});

export const artistsReducer = artistSlice.reducer;
