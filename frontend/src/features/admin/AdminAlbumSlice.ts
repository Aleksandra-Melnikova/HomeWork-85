import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { Album} from "../../types";
import { fetchAdminAllAlbums} from "./AdminAlbumsThunk.ts";

interface IProductsState {
  fetchLoading: boolean;
  createAlbumLoading: boolean;
  createAllAlbumLoading: boolean;
  albumsAll: Album[] | null;
}

const initialState: IProductsState = {
  fetchLoading: false,
  createAlbumLoading: false,
  createAllAlbumLoading: false,
  albumsAll: null,
};

export const selectAllAdminAlbums = (state: RootState) => state.adminAlbum.albumsAll;


export const albumsAdminSlice = createSlice({
  name: "admin/albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAllAlbums.pending, (state) => {
        state.createAllAlbumLoading = true;
      })
      .addCase(fetchAdminAllAlbums.fulfilled, (state, { payload: albums }) => {
        state.createAllAlbumLoading = false;
        state.albumsAll = albums;
      })
      .addCase(fetchAdminAllAlbums.rejected, (state) => {
        state.createAllAlbumLoading = false;
      });
  },
});

export const albumsAdminReducer = albumsAdminSlice .reducer;
