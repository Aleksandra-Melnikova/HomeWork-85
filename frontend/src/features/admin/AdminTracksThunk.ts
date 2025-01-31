import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { TrackAdmin } from "../../types";

export const fetchAdminTracks = createAsyncThunk<TrackAdmin[], void>(
  "admin/tracks/fetchAdminTracks",
  async () => {
    const tracksResponse = await axiosApi<TrackAdmin[]>("/admin/tracks");
    return tracksResponse.data || [];
  },
);
export const deleteAdminTrack = createAsyncThunk<void, string>(
  "admin/tracks/deleteAdminTrack",
  async (id) => {
    return axiosApi.delete(`/tracks/${id}`, {});
  },
);

export const publishAdminTrack = createAsyncThunk<void, string>(
  "admin/tracks/ publishAdminTrack",
  async (id) => {
    return axiosApi.patch(`/tracks/${id}/togglePublished`, {});
  },
);
