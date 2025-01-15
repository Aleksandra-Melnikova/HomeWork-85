import Grid from "@mui/material/Grid2";
import {
    Card, CardContent,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";


interface Props {
    name: string;
    trackNumber:number
    id: string;
    time: string;
}

const TrackItem: React.FC<Props> = ({trackNumber, name, time}) => {

    return (
        <Grid size={10}>
        <Grid style={{width:"70%"}}>
            <Card component={Link}  to={'/tracks'} style={{textDecoration:"none"}}>
                <CardContent style={{display:"flex", padding:"10px", fontSize:"20px"}}>
                    <Typography display={"inline-block"} variant={"h5"} color="textPrimary" component="p">{trackNumber}. {name}</Typography>
                    <Typography marginLeft={"auto"} display={"inline-block"} variant="h6" color="textSecondary" component="p">{time}</Typography>
                </CardContent>
            </Card>
        </Grid>
        </Grid>
    );
};

export default TrackItem;
