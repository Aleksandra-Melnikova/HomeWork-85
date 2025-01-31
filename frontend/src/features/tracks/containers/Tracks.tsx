import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import TrackItem from "../components/TrackItem.tsx";
import { selectFetchLoading, selectTracks } from "../trackSlice.ts";
import { fetchTracks } from "../tracksThunk.ts";
import { useLocation } from "react-router-dom";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = searchParams.get("album");

  useEffect(() => {
    if (params) {
      dispatch(fetchTracks(params));
    } else {
    }
  }, [dispatch]);

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          {!tracks?   <Typography variant="h6">No tracks yet</Typography>:  <Typography
              style={{ marginLeft: "30px", marginTop: "20px" }}
              variant="h4"
          >
            Albums {tracks?.album.title} of {tracks?.artist.name}{" "}
          </Typography>}

        </Grid>
      </Grid>

      <Grid container direction={"column"}>
        {isFetchLoading ? (
          <CircularProgress />
        ) : (
          <>
            {tracks?.tracks.length === 0 && !isFetchLoading ? (
              <Typography variant="h6">No tracks yet</Typography>
            ) : (
              <>
                {tracks?.tracks.map((track) => (
                  <TrackItem
                      isPublished={track.isPublished}
                    key={track._id}
                    id={track._id}
                    time={track.time}
                    name={track.name}
                    trackNumber={track.trackNumber}
                    link={track.linkYouTube}
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

export default Tracks;
