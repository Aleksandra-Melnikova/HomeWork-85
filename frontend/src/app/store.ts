import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "../features/artists/artistSlice.ts";
import { albumsReducer } from "../features/albums/albumSlice.ts";
import { tracksReducer } from "../features/tracks/trackSlice.ts";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { usersReducer } from "../features/users/UserSlice.ts";
import { trackHistoryReducer } from "../features/trackHistory/trackHistorySlice.ts";
import {albumsAdminReducer} from "../features/admin/AdminAlbumSlice.ts";
import {adminArtistsReducer} from "../features/admin/AdminArtistSlice.ts";
import {tracksAdminReducer} from "../features/admin/AdminTrackSlice.ts";

const usersPersistConfig = {
  key: "store:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  adminAlbum:  albumsAdminReducer,
  adminArtist: adminArtistsReducer,
  adminTracks: tracksAdminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
