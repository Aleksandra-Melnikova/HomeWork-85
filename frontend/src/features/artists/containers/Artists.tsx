import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import { selectArtists, selectFetchLoading } from "../artistSlice.ts";
import { fetchArtists } from "../artistsThunk.ts";
import ArtistItem from "../components/ArtistItem.tsx";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetchLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);


  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography
            style={{ marginLeft: "30px", marginTop: "20px" }}
            variant="h4"
          >
            Artists
          </Typography>
        </Grid>
        <Grid></Grid>
      </Grid>

      <Grid container direction={"row"}>
        {isFetchLoading ? (
          <CircularProgress />
        ) : (
          <>
            {artists.length === 0 && !isFetchLoading ? (
              <Typography variant="h6">No artists yet</Typography>
            ) : (
              <>
                {artists.map((artist) => (
                  <ArtistItem
                    isPublished={artist.isPublished}
                    key={artist._id}
                    id={artist._id}
                    name={artist.name}
                    image={artist.image}
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

export default Artists;
