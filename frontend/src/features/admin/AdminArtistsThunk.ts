import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Artist } from "../../types";

export const fetchAdminArtists = createAsyncThunk<Artist[], void>(
  "admin/artists/fetchAdminArtists",
  async () => {
    const artistsResponse = await axiosApi<Artist[]>("/artists");
    return artistsResponse.data || [];
  },
);

export const deleteAdminArtist = createAsyncThunk<void, string>(
  "admin/artists/deleteAdminArtist",
  async (id) => {
    return axiosApi.delete(`/artists/${id}`, {});
  },
);

export const publishAdminArtist = createAsyncThunk<void, string>(
  "admin/artists/publishAdminArtist",
  async (id) => {
    return axiosApi.patch(`/artists/${id}/togglePublished`, {});
  },
);
