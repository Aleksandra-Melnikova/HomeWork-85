import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import TrackHistoryItem from "../components/TrackHistoryItem.tsx";
import {selectFetchLoading, selectTracksHistory} from "../trackHistorySlice.ts";
import {fetchTrackHistory} from "../trackHistoryThunk.ts";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTracksHistory);
  const isFetchLoading = useAppSelector(selectFetchLoading);


  useEffect(() => {
      dispatch(fetchTrackHistory());
  }, [dispatch]);

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography
            style={{ marginLeft: "30px", marginTop: "20px" }}
            variant="h4"
          >
            Track History
          </Typography>
        </Grid>
        <Grid></Grid>
      </Grid>

      <Grid container direction={"column"}>
        {isFetchLoading ? (
          <CircularProgress />
        ) : (
          <>
            {trackHistory?.length === 0 && !isFetchLoading ? (
              <Typography variant="h6">No tracks yet</Typography>
            ) : (
              <>
                {trackHistory?.map((track) => (
                  <TrackHistoryItem
                    key={track._id}
                    id={track._id}
                    datetime={track.datetime}
                    artistName={track.artistName}
                   name={track.track.name}/>
                ))}
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default TrackHistory;
