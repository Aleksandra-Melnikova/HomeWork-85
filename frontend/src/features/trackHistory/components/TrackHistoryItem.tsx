import Grid from "@mui/material/Grid2";
import { Box, Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  name: string;
  artistName: string;
  id: string;
  datetime: string;
}

const TrackHistoryItem: React.FC<Props> = ({ name, datetime, artistName }) => {
  const date = dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");
  return (
    <Grid marginBottom={"20px"} size={12}>
      <Grid style={{ width: "70%" }}>
        <Card style={{ textDecoration: "none" }}>
          <CardContent
            style={{ display: "flex", padding: "10px", fontSize: "20px" }}
          >
            <Box>
              {" "}
              <Typography
                display={"block"}
                variant={"h5"}
                color="textPrimary"
                component="p"
              >
                {" "}
                {name}
              </Typography>
              <Typography
                display={"block"}
                variant={"h5"}
                color="secondary"
                component="p"
              >
                {artistName}
              </Typography>
            </Box>
            <Typography
              marginLeft={"auto"}
              display={"inline-block"}
              variant="h6"
              color="textSecondary"
              component="p"
            >
              {date}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TrackHistoryItem;
