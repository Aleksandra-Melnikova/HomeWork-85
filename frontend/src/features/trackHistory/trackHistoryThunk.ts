import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { TrackHistory, TrackHistoryPost, ValidationError } from "../../types";
import { RootState } from "../../app/store.ts";
import { isAxiosError } from "axios";

export const fetchTrackHistory = createAsyncThunk<
  TrackHistory[],
  void,
  { state: RootState }
>("tracksHistory/fetchTrackHistory ", async (_, { getState }) => {
  const token = getState().users.user?.token;
  const tracksResponse = await axiosApi<TrackHistory[]>("/track_history", {
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  return tracksResponse.data || [];
});

export const createTrackHistory = createAsyncThunk<
  void,
  TrackHistoryPost,
  { rejectValue: ValidationError }
>(
  "tracksHistory/createTrackHistory ",
  async (TrackHistoryPost, { rejectWithValue }) => {
    try {
      await axiosApi.post(
        "/track_history",
        { track: TrackHistoryPost.Id },
        { headers: { Authorization: TrackHistoryPost.token } },
      );
    } catch (error) {
      if (isAxiosError(error) && error.status === 400 && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
