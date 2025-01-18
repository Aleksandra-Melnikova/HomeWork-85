import Grid from "@mui/material/Grid2";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/UserSlice.ts";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { createTrackHistory } from "../../trackHistory/trackHistoryThunk.ts";
import { TrackHistoryPost } from "../../../types";
import { selectCreateError } from "../../trackHistory/trackHistorySlice.ts";
import { toast } from "react-toastify/unstyled";

interface Props {
  name: string;
  trackNumber: number;
  id: string;
  time: string;
  link :string
}

const TrackItem: React.FC<Props> = ({ trackNumber, name, time, id, link }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateError);
  if (error) {
    toast.error(error?.errors.track.message);
  }

  const onPlay = (id: string) => {
    if (user) {
      const Obj: TrackHistoryPost = {
        Id: id,
        token: user.token,
      };
      dispatch(createTrackHistory(Obj));
    }
  };

  return (
    <Grid marginBottom={"20px"} size={{ xs: 12, sm: 12, md: 10, lg: 8 }}>
      <Grid style={{ width: "70%" }}>
        <Card
          component={Link}
          to={"/tracks"}
          style={{ textDecoration: "none" }}
        >
          <CardContent
            style={{ display: "flex", padding: "10px", fontSize: "20px" }}
          >
            <Typography
              display={"inline-block"}
              variant={"h5"}
              color="textPrimary"
              component="p"
            >
              {trackNumber}. {name}
            </Typography>
            <Typography
              marginLeft={"auto"}
              display={"inline-block"}
              variant="h6"
              color="textSecondary"
              component="p"
            >
              {time}
            </Typography>
            {user ? (

              <Link
                  to={link}
                onClick={() => onPlay(id)}
                style={{ paddingTop: "4px", marginInline: "10px" }}
                className={'tube'}
               >
                <PlayArrowIcon fontSize={"medium"} />
              </Link>

            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TrackItem;
