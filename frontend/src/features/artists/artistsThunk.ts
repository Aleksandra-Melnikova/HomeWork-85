import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Artist } from "../../types";

export const fetchArtists = createAsyncThunk<Artist[], void>(
  "artists/fetchArtists",
  async () => {
    const artistsResponse = await axiosApi<Artist[]>("/artists");
    return artistsResponse.data || [];
  },
);
