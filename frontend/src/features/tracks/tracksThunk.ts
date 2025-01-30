import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Track, TrackInterfaceWithoutID } from "../../types";

export const fetchTracks = createAsyncThunk<Track, string>(
  "tracks/fetchTracks",
  async (id) => {
    const tracksResponse = await axiosApi<Track>("/tracks?album=" + id);
    return tracksResponse.data || [];
  },
);

export const createTrack = createAsyncThunk<void, TrackInterfaceWithoutID>(
  "tracks/createTrack",
  async (Track) => {
    const formData = new FormData();

    const keys = Object.keys(Track) as (keyof TrackInterfaceWithoutID)[];

    keys.forEach((key) => {
      const value = Track[key];

      if (value !== null) {
        formData.append(key, value as string | File);
      }
    });

    await axiosApi.post("/tracks", formData);
  },
);
