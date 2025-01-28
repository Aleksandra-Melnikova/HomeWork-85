import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Artist, ArtistMutation} from "../../types";

export const fetchArtists = createAsyncThunk<Artist[], void>(
  "artists/fetchArtists",
  async () => {
    const artistsResponse = await axiosApi<Artist[]>("/artists");
    return artistsResponse.data || [];
  },
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
    "artists/createArtist",
    async (productMutation) => {
        const formData = new FormData();

        const keys = Object.keys(productMutation) as (keyof ArtistMutation)[];

        keys.forEach((key) => {
            const value = productMutation[key] ;

            if (value !== null) {
                formData.append(key, value as string | File);
            }
        });

        await axiosApi.post("/artists", formData);
    },
);
