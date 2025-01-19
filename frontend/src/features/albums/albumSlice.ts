import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbums } from "./albumsThunk.ts";
import { RootState } from "../../app/store.ts";
import { AlbumNew } from "../../types";

interface IProductsState {
  albums: AlbumNew[] | null;
  fetchLoading: boolean;
}

const initialState: IProductsState = {
  albums: null,
  fetchLoading: false,
};

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectFetchLoading = (state: RootState) =>
  state.albums.fetchLoading;

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
      });
  },
});

export const albumsReducer = albumSlice.reducer;
