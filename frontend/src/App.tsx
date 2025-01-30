import { Container, CssBaseline } from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import { Route, Routes } from "react-router-dom";
import Artists from "./features/artists/containers/Artists.tsx";
import Tracks from "./features/tracks/containers/Tracks.tsx";
import Albums from "./features/albums/containers/Albums.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import RegisrerPage from "./features/users/RegisrerPage.tsx";
import TrackHistory from "./features/trackHistory/containers/trackHistory.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import NewArtist from "./features/artists/containers/NewArtist.tsx";
import { selectUser } from "./features/users/UserSlice.ts";
import { useAppSelector } from "./app/hooks.ts";
import NewAlbum from "./features/albums/containers/NewAlbum.tsx";
import NewTrack from "./features/tracks/containers/NewTrack.tsx";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/register" element={<RegisrerPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/artists/new"
              element={
                <ProtectedRoute
                  isAllowed={
                    user && (user.role === "admin" || user.role === "user")
                  }
                >
                  <NewArtist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/albums/new"
              element={
                <ProtectedRoute
                  isAllowed={
                    user && (user.role === "admin" || user.role === "user")
                  }
                >
                  <NewAlbum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracks/new"
              element={
                <ProtectedRoute
                  isAllowed={
                    user && (user.role === "admin" || user.role === "user")
                  }
                >
                  <NewTrack />
                </ProtectedRoute>
              }
            />
            <Route path="/artists" element={<Artists />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/trackHistory" element={<TrackHistory />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
