import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { AlbumNew } from "../../types";

export const fetchAlbums = createAsyncThunk<AlbumNew[], string>(
  "albums/fetchAlbums",
  async (id) => {
    const albumsResponse = await axiosApi<AlbumNew[]>("/albums?artist=" + id);
    return albumsResponse.data || [];
  },
);
