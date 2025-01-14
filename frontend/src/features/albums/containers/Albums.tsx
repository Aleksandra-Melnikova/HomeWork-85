
import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import {selectFetchLoading} from "../albumSlice.ts";
import AlbumItem from "../components/AlbumItem.tsx";
import {selectAlbums} from "../albumSlice.ts";
import { useSearchParams} from "react-router-dom";
import {fetchAlbums} from "../albumsThunk.ts";

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isFetchLoading = useAppSelector(selectFetchLoading);

    const [searchParams, setSearchParams] = useSearchParams();
    const params = searchParams.get("artist");


  useEffect(() => {
      if(params){
          dispatch(fetchAlbums(params))
          setSearchParams(params);
      }
  }, [dispatch]);
  console.log(albums);


  return (
      <Grid container direction={"column"} spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography style={{marginLeft:"30px", marginTop:"20px"}} variant="h4">Albums</Typography>
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
