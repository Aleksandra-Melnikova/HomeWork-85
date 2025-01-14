
import { createSlice } from "@reduxjs/toolkit";
import { fetchArtists} from "./artistsThunk.ts";
import { RootState } from "../../app/store.ts";
import {Artist} from "../../types";

interface IProductsState {
  artists: Artist[];
  fetchLoading: boolean;
}

const initialState: IProductsState = {
  artists: [],
  fetchLoading: false,
};

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectFetchLoading = (state: RootState) =>
  state.artists.fetchLoading;


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

  },
});

export const artistsReducer = artistSlice.reducer;
