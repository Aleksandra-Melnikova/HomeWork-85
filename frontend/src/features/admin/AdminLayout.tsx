import Grid from "@mui/material/Grid2";

import AdminMenu from "./AdminMenu.tsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Grid container>
      <Grid sx={{ width: 200 }}>
        <AdminMenu />
      </Grid>
      <Grid>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
