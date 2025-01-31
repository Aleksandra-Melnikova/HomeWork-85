import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Album} from "../../types";


export const fetchAdminAllAlbums = createAsyncThunk<Album[], void>(
  "admin/albums/fetchAdminAllAlbums",
  async () => {
    const albumsResponse = await axiosApi<Album[]>("/admin/albums");
    return albumsResponse.data || [];
  },
);

// export const createAdminAlbum = createAsyncThunk<void, AlbumMutation>(
//   "admin/albums/createAdminAlbum",
//   async (AlbumMutation) => {
//     const formData = new FormData();
//
//     const keys = Object.keys(AlbumMutation) as (keyof AlbumMutation)[];
//
//     keys.forEach((key) => {
//       const value = AlbumMutation[key];
//
//       if (value !== null) {
//         formData.append(key, value as string | File);
//       }
//     });
//
//     await axiosApi.post("/admin/albums", formData);
//   },
// );
