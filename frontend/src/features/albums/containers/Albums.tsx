import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectFetchLoading } from "../../tracks/trackSlice.ts";
import AlbumItem from "../components/AlbumItem.tsx";
import { selectAlbums } from "../albumSlice.ts";
import { fetchAlbums } from "../albumsThunk.ts";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = searchParams.get("artist");

  useEffect(() => {
    if (params) {
      dispatch(fetchAlbums(params));
    }
  }, [dispatch]);

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          {albums ? (
            <Typography
              style={{ marginLeft: "30px", marginTop: "20px" }}
              variant="h4"
            >
              Albums of {albums[0].album.artist.name}
            </Typography>
          ) : null}
        </Grid>
        <Grid></Grid>
      </Grid>

      <Grid container direction={"row"}>
        {isFetchLoading ? (
          <CircularProgress />
        ) : (
          <>
            {!albums || (albums?.length === 0 && !isFetchLoading) ? (
              <Typography variant="h6">No albums yet</Typography>
            ) : (
              <>
                {albums?.map((album) => (
                  <AlbumItem
                    isPublished={album.album.isPublished}
                    key={album.album._id}
                    id={album.album._id}
                    title={album.album.title}
                    image={album.album.image}
                    year={album.album.year}
                    tracks={album.trackNumber}
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
