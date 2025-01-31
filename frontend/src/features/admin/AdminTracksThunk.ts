import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { TrackAdmin} from "../../types";

export const fetchAdminTracks = createAsyncThunk<TrackAdmin[], void>(
  "admin/tracks/fetchAdminTracks",
  async () => {
    const tracksResponse = await axiosApi<TrackAdmin[]>("/admin/tracks");
    return tracksResponse.data || [];
  },
);

// export const createTrack = createAsyncThunk<void, TrackInterfaceWithoutID>(
//   "tracks/createTrack",
//   async (Track) => {
//     const formData = new FormData();
//
//     const keys = Object.keys(Track) as (keyof TrackInterfaceWithoutID)[];
//
//     keys.forEach((key) => {
//       const value = Track[key];
//
//       if (value !== null) {
//         formData.append(key, value as string | File);
//       }
//     });
//
//     await axiosApi.post("/tracks", formData);
//   },
// );
