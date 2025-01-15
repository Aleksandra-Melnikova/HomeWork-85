import Grid from "@mui/material/Grid2";
import {
    Card, CardContent,
    CardHeader,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";


interface Props {
    name: string;
    trackNumber:number
    id: string;
    time: string;
}

const TrackItem: React.FC<Props> = ({trackNumber, name, time, id}) => {

    return (
        <Grid direction={"row"} style={{width:"40%"}}>
            <Card component={Link} to={"/tracks?album=" + id} style={{textDecoration:"none"}}>
                <CardContent style={{display:"flex", padding:"10px", fontSize:"20px"}}>
                    <Typography display={"inline-block"} variant={"h5"} color="textPrimary" component="p">{trackNumber}. {name}</Typography>
                    <Typography marginLeft={"auto"} display={"inline-block"} variant="h6" color="textSecondary" component="p">{time}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TrackItem;
