
import { Container, CssBaseline } from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes, useSearchParams} from "react-router-dom";
import Artists from "./features/artists/containers/Artists.tsx";
import Tracks from "./features/tracks/containers/Tracks.tsx";
import Albums from "./features/albums/containers/Albums.tsx";
import {useEffect} from "react";
import {fetchAlbums} from "./features/albums/albumsThunk.ts";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {selectArtists} from "./features/artists/artistSlice.ts";
import {fetchTracks} from "./features/tracks/tracksThunk.ts";
import {selectAlbums} from "./features/albums/albumSlice.ts";

const App = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const paramsArtist = searchParams.get("artist");
    const paramsAlbum = searchParams.get("album");
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const albums= useAppSelector(selectAlbums);
    console.log(paramsArtist);
    console.log(paramsAlbum);


    let artistName = '';
    let albumName = '';
    console.log(artistName);
    console.log(albumName);
    useEffect(() => {
        if(paramsArtist){
            dispatch(fetchAlbums(paramsArtist));
            artists.map(item => {
                if(item._id === paramsArtist)
                    artistName = item.name});
        }
        if(paramsAlbum){
            dispatch(fetchTracks(paramsAlbum));
            albums.map(item => {
                if(item._id === paramsArtist)
                    albumName = item.title});
        }
    }, [dispatch]);

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
                        <Route path={"/albums"}  element={<Albums artistName={artistName}/>} />
                        <Route path="/tracks" element={<Tracks albumName={albumName} artistName={artistName}/>} />
                        <Route path="*" element={<h1>Not found</h1>} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;
