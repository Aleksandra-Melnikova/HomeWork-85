import Grid from "@mui/material/Grid2";
import {Button, Card, CardHeader, CardMedia} from "@mui/material";
import { Link } from "react-router-dom";
import NoPictureImage from "../../../assets/noPicture.png";
import { apiUrl } from "../../../globalConstants.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/UserSlice.ts";

interface Props {
  name: string;
  id: string;
  image?: string | null | undefined;
  isPublished: boolean;
}

const ArtistItem: React.FC<Props> = ({ name, image, id,isPublished }) => {
  let productsImage = NoPictureImage;

  if (image) {
    productsImage = apiUrl + "/" + image;
  }
  const user = useAppSelector(selectUser);

  return (
    <Grid marginBottom={"20px"} size={{ xs: 10, sm: 8, md: 5, lg: 4 }}>
      <Card
        component={Link}
        to={"/albums?artist=" + id}
        style={{ textDecoration: "none" }}
      >
        <CardHeader title={name} />
        <CardMedia
          style={{ width: "100%", height: "600px", marginBottom: "10px" }}
          component="img"
          image={productsImage}
          title={name}
        />
        {user && user.role === 'admin' && (
            <div style={{ textAlign:"center",  marginLeft: "auto", marginRight: "auto" }}>
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

export default ArtistItem;
