import { createSlice } from "@reduxjs/toolkit";
import {createAlbum, fetchAlbums} from "./albumsThunk.ts";
import { RootState } from "../../app/store.ts";
import { AlbumNew } from "../../types";
import {createArtist} from "../artists/artistsThunk.ts";

interface IProductsState {
  albums: AlbumNew[] | null;
  fetchLoading: boolean;
  createAlbumLoading: boolean;
}

const initialState: IProductsState = {
  albums: null,
  fetchLoading: false,
  createAlbumLoading: false,
};

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectFetchLoading = (state: RootState) =>
  state.albums.fetchLoading;
export const selectCreateAlbumLoading = (state: RootState) =>
    state.albums. createAlbumLoading;

export const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.fetchLoading = false;
        if (albums) state.albums = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.fetchLoading = false;
      })
  .addCase(createAlbum.pending, (state) => {
      state.createAlbumLoading = true;
    })
        .addCase(createArtist.fulfilled, (state) => {
          state.createAlbumLoading = false;
        })
        .addCase(createArtist.rejected, (state) => {
          state.createAlbumLoading = false;
        });
  },
});

export const albumsReducer = albumSlice.reducer;
