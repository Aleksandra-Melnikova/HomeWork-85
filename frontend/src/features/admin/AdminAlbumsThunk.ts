import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Album } from "../../types";

export const fetchAdminAllAlbums = createAsyncThunk<Album[], void>(
  "admin/albums/fetchAdminAllAlbums",
  async () => {
    const albumsResponse = await axiosApi<Album[]>("/admin/albums");
    return albumsResponse.data || [];
  },
);

export const deleteAdminAlbums = createAsyncThunk<void, string>(
  "admin/albums/deleteAdminAlbums",
  async (id) => {
    return axiosApi.delete(`/admin/albums/${id}`, {});
  },
);

export const publishAdminAlbums = createAsyncThunk<void, string>(
  "admin/albums/deleteAdminAlbums",
  async (id) => {
    return axiosApi.patch(`/admin/albums/${id}/togglePublished`, {});
  },
);
