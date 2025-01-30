import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Album, AlbumMutation, AlbumNew } from "../../types";

export const fetchAlbums = createAsyncThunk<AlbumNew[], string>(
  "albums/fetchAlbums",
  async (id) => {
    const albumsResponse = await axiosApi<AlbumNew[]>("/albums?artist=" + id);
    return albumsResponse.data || [];
  },
);

export const fetchAllAlbums = createAsyncThunk<Album[], void>(
  "albums/fetchAllAlbums",
  async () => {
    const albumsResponse = await axiosApi<Album[]>("/albums");
    return albumsResponse.data || [];
  },
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  "albums/fetchAlbum",
  async (AlbumMutation) => {
    const formData = new FormData();

    const keys = Object.keys(AlbumMutation) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      const value = AlbumMutation[key];

      if (value !== null) {
        formData.append(key, value as string | File);
      }
    });

    await axiosApi.post("/albums", formData);
  },
);
