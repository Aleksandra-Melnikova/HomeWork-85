import { configureStore } from "@reduxjs/toolkit";
import {artistsReducer} from "../features/artists/artistSlice.ts";
import {albumsReducer} from "../features/albums/albumSlice.ts";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
