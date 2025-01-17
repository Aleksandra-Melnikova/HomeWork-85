import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { artistsReducer } from "../features/artists/artistSlice.ts";
import { albumsReducer } from "../features/albums/albumSlice.ts";
import { tracksReducer } from "../features/tracks/trackSlice.ts";
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST,persistStore, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import {usersReducer} from "../features/users/UserSlice.ts";

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
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