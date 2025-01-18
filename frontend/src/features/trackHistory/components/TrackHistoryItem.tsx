import Grid from "@mui/material/Grid2";
import {Card, CardContent, Typography} from "@mui/material";

interface Props {
  name: string;
  artistName: string;
  id: string;
  datetime: string;
}

const TrackHistoryItem: React.FC<Props> = ({ name, datetime, artistName }) => {
  return (
    <Grid marginBottom={"20px"} size={12}>
      <Grid style={{ width: "70%" }}>
        <Card
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
               {name} of {artistName}
            </Typography>
            <Typography
              marginLeft={"auto"}
              display={"inline-block"}
              variant="h6"
              color="textSecondary"
              component="p"
            >
              {datetime}
            </Typography>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TrackHistoryItem;
