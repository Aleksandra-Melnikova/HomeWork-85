import { Container, CssBaseline } from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import { Route, Routes } from "react-router-dom";
import Artists from "./features/artists/containers/Artists.tsx";
import Tracks from "./features/tracks/containers/Tracks.tsx";
import Albums from "./features/albums/containers/Albums.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import RegisrerPage from "./features/users/RegisrerPage.tsx";
import TrackHistory from "./features/trackHistory/containers/trackHistory.tsx";

const App = () => {
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
