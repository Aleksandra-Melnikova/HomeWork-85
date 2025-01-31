import Grid from "@mui/material/Grid2";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoPictureImage from "../../../assets/noPicture.png";
import { apiUrl } from "../../../globalConstants.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/UserSlice.ts";

interface Props {
  title: string;
  year: number;
  id: string;
  image?: string | null | undefined;
  tracks: number;
  isPublished: boolean;
}

const AlbumItem: React.FC<Props> = ({ title, year, image, id, tracks, isPublished }) => {
  let productsImage = NoPictureImage;

  if (image) {
    productsImage = apiUrl + "/" + image;
  }

  const user = useAppSelector(selectUser);

  return (
    <Grid marginBottom={"20px"} size={{ xs: 10, sm: 8, md: 5, lg: 4 }}>
      <Card
        component={Link}
        to={"/tracks?album=" + id}
        style={{ textDecoration: "none" }}
      >
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Year:{year}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Tracks:{tracks}
          </Typography>
        </CardContent>
        <CardMedia
          style={{ width: "100%", height: "600px" }}
          component="img"
          image={productsImage}
          title={title}
        />
        {user && user.role === 'admin' && (
            <div style={{ textAlign:"center", marginTop:"20px" }}>
              <Button   color="primary"  variant={"contained"}>
                Delete
              </Button>
            </div>
        )}

        {user && user.role === 'admin' && !isPublished  && (
            <div style={{ marginTop: "20px",  marginRight: "auto" }}>
              <Button   color="primary"  variant={"contained"}>
                Publish
              </Button>
            </div>
        )}
      </Card>
    </Grid>
  );
};

export default AlbumItem;
