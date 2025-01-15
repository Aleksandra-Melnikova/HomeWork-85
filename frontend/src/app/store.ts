import { configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "../features/artists/artistSlice.ts";
import { albumsReducer } from "../features/albums/albumSlice.ts";
import { tracksReducer } from "../features/tracks/trackSlice.ts";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
