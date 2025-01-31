import Grid from "@mui/material/Grid2";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <Grid container>
      <Grid>
        <Typography variant="h6">Admin Menu</Typography>
      </Grid>
      <Grid>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={`/admin/artists`}>
              <ListItemText primary={"Artists"}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={`/admin/albums`}>
              <ListItemText primary={"Albums"}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={`/admin/tracks`}>
              <ListItemText primary={"Tracks"}></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;
