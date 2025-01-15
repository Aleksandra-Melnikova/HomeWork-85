import Grid from "@mui/material/Grid2";
import { Card, CardHeader, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import NoPictureImage from "../../../assets/noPicture.png";
import { apiUrl } from "../../../globalConstants.ts";

interface Props {
  name: string;
  id: string;
  image?: string | null | undefined;
}

const ArtistItem: React.FC<Props> = ({ name, image, id }) => {
  let productsImage = NoPictureImage;

  if (image) {
    productsImage = apiUrl + "/" + image;
  }

  return (
    <Grid marginBottom={"20px"} size={{ xs: 10, sm: 8, md: 5, lg: 4 }}>
      <Card
        component={Link}
        to={"/albums?artist=" + id}
        style={{ textDecoration: "none" }}
      >
        <CardHeader title={name} />
        <CardMedia
          style={{ width: "100%", height: "600px" }}
          component="img"
          image={productsImage}
          title={name}
        />
      </Card>
    </Grid>
  );
};

export default ArtistItem;
