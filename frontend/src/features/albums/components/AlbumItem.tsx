import Grid from "@mui/material/Grid2";
import {
    Card, CardContent,
    CardHeader,
    CardMedia, Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoPictureImage from "../../../assets/noPicture.png";
import { apiUrl } from "../../../globalConstants.ts";

interface Props {
    title: string;
    year:number
    id: string;
    image?: string | null | undefined;
}

const AlbumItem: React.FC<Props> = ({title, year, image, id}) => {
    let productsImage = NoPictureImage;

    if (image) {
        productsImage = apiUrl + "/" + image;
    }

    return (
        <Grid size={{ xs: 10, sm: 8, md: 5, lg: 4 }}>
            <Card component={Link} to={"/albums?artist=" + id} style={{textDecoration:"none"}}>
                <CardHeader title={title}/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">Year:{year}</Typography>
                </CardContent>
                <CardMedia
                    style={{ width: "100%", height: "600px" }}
                    component="img"
                    image={productsImage}
                    title={title}
                />
            </Card>
        </Grid>
    );
};

export default AlbumItem;
