
import { Container, CssBaseline } from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Artists from "./features/artists/containers/Artists.tsx";
import Albums from "./features/albums/containers/Albums.tsx";

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
                        <Route path="/" element={<Artists/>} />
                        <Route path={"/albums"}  element={<Albums/>} />
                        {/*<Route path="/products" element={<Tracks />} />*/}
                        <Route path="*" element={<h1>Not found</h1>} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;
