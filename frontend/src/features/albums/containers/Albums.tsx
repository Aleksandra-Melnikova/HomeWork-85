
import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import {selectFetchLoading} from "../../tracks/trackSlice.ts";
import AlbumItem from "../components/AlbumItem.tsx";
import { useSearchParams} from "react-router-dom";;
import {selectArtists} from "../../artists/artistSlice.ts";
import {Album} from "../../../types";
import {selectAlbums} from "../albumSlice.ts";
import {fetchAlbums} from "../albumsThunk.ts";
import * as React from "react";

interface Props {
    artistName: string;
}

const Albums:React.FC<Props> = ({artistName}) => {
  // const dispatch = useAppDispatch();
  const albums:Album[] = useAppSelector(selectAlbums);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  // const artists = useAppSelector(selectArtists);

  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const params = searchParams.get("artist");
  //   console.log(params);
  //
  //
  // useEffect(() => {
  //     if(params){
  //         dispatch(fetchAlbums(params))
  //     }
  // }, [dispatch]);
  // let artistName = '';
  // artists.map(item => {
  //     if(item._id === params)
  //      artistName = item.name});



  return (
      <Grid container direction={"column"} spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography style={{marginLeft:"30px", marginTop:"20px"}} variant="h4">Albums of {artistName} </Typography>
          </Grid>
          <Grid>
          </Grid>
        </Grid>

        <Grid container direction={"row"}>
          {isFetchLoading ? (
              <CircularProgress />
          ) : (
              <>
                  {albums.length === 0 && !isFetchLoading ? (
                    <Typography variant="h6">No artists yet</Typography>
                ) : (
                    <>
                      {albums.map((album) => (
                          <AlbumItem
                              key={album._id}
                              id={album._id}
                              title={album.title}
                              image={album.image}
                              year={album.year}
                          />
                      ))}
                    </>
                )}
              </>
          )}
        </Grid>
      </Grid>
  );
};

export default Albums;
