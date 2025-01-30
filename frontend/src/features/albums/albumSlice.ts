import { createSlice } from "@reduxjs/toolkit";
import { createAlbum, fetchAlbums, fetchAllAlbums } from "./albumsThunk.ts";
import { RootState } from "../../app/store.ts";
import { Album, AlbumNew } from "../../types";
import { createArtist } from "../artists/artistsThunk.ts";

interface IProductsState {
  albums: AlbumNew[] | null;
  fetchLoading: boolean;
  createAlbumLoading: boolean;
  createAllAlbumLoading: boolean;
  albumsAll: Album[] | null;
}

const initialState: IProductsState = {
  albums: null,
  fetchLoading: false,
  createAlbumLoading: false,
  createAllAlbumLoading: false,
  albumsAll: null,
};

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAllAlbums = (state: RootState) => state.albums.albumsAll;
export const selectFetchLoading = (state: RootState) =>
  state.albums.fetchLoading;
export const selectCreateAlbumLoading = (state: RootState) =>
  state.albums.createAlbumLoading;
export const selectCreateAllAlbumLoading = (state: RootState) =>
  state.albums.createAllAlbumLoading;

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
        state.createAllAlbumLoading = false;
      })
      .addCase(fetchAllAlbums.pending, (state) => {
        state.createAllAlbumLoading = true;
      })
      .addCase(fetchAllAlbums.fulfilled, (state, { payload: albums }) => {
        state.createAllAlbumLoading = false;
        state.albumsAll = albums;
      })
      .addCase(fetchAllAlbums.rejected, (state) => {
        state.createAllAlbumLoading = false;
      });
  },
});

export const albumsReducer = albumSlice.reducer;
