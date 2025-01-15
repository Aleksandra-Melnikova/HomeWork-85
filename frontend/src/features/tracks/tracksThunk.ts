import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Track} from "../../types";


export const fetchTracks= createAsyncThunk<Track[], string>(
  "tracks/fetchTracks",
  async (id) => {
    const tracksResponse = await axiosApi<Track[]>("/tracks?album="+ id);
    return tracksResponse.data || [];
  },
);


