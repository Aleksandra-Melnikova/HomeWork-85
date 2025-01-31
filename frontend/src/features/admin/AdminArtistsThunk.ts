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

// export const createArtist = createAsyncThunk<void, ArtistMutation>(
//   "artists/createArtist",
//   async (ArtistMutation) => {
//     const formData = new FormData();
//
//     const keys = Object.keys(ArtistMutation) as (keyof ArtistMutation)[];
//
//     keys.forEach((key) => {
//       const value = ArtistMutation[key];
//
//       if (value !== null) {
//         formData.append(key, value as string | File);
//       }
//     });
//
//     await axiosApi.post("/artists", formData);
//   },
// );
