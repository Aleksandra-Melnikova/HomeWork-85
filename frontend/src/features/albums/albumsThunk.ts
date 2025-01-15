import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Album} from "../../types";


export const fetchAlbums = createAsyncThunk<Album, string>(
  "albums/fetchAlbums",
  async (id) => {
    const albumsResponse = await axiosApi<Album>("/albums?artist="+ id);
    return albumsResponse.data || [];
  },
);


