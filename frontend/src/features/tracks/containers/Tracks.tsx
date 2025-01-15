
import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import {selectAlbums, selectFetchLoading} from "../../albums/albumSlice.ts";
import TrackItem from "../components/TrackItem.tsx";
import { useSearchParams} from "react-router-dom";
import {fetchAlbums} from "../../albums/albumsThunk.ts";
import {selectArtists} from "../../artists/artistSlice.ts";
import {selectTracks} from "../trackSlice.ts";
import {fetchTracks} from "../tracksThunk.ts";
import * as React from "react";
interface Props {
    albumName: string;
    artistName: string;
}

const Tracks:React.FC<Props> = ({albumName,artistName}) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const albums = useAppSelector(selectAlbums);

  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const params = searchParams.get("album");
  //   console.log(params);
  //
  //
  // useEffect(() => {
  //     if(params){
  //         dispatch(fetchTracks(params))
  //     }
  // }, [dispatch]);
  // let albumName = '';
  // albums.map(item => {
  //     if(item._id === params) albumName = item.title});



  return (
      <Grid container direction={"column"} spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography style={{marginLeft:"30px", marginTop:"20px"}} variant="h4">Albums {albumName} of {artistName}  </Typography>
          </Grid>
          <Grid>
          </Grid>
        </Grid>

        <Grid container direction={"column"}>
          {isFetchLoading ? (
              <CircularProgress />
          ) : (
              <>
                  {tracks.length === 0 && !isFetchLoading ? (
                    <Typography variant="h6">No tracks yet</Typography>
                ) : (
                    <>
                      {tracks.map((track) => (
                          <TrackItem
                              key={track._id}
                              id={track._id}
                              time={track.time}
                              name={track.name}
                              trackNumber={track.trackNumber}/>
                      ))}
                    </>
                )}
              </>
          )}
        </Grid>
      </Grid>
  );
};

export default Tracks;


