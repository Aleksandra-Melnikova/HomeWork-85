import { AppBar, Button, styled, Toolbar, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { selectUser } from "../../../features/users/UserSlice.ts";
import { useAppSelector } from "../../../app/hooks.ts";
import UserMenu from "./UserMenu.tsx";
import AnonimusMenu from "./AnonimusMenu.tsx";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Spotify</Link>
        </Typography>
        {user ? (
          <Button
            style={{ marginInline: "20px" }}
            component={NavLink}
            to="/trackHistory"
            color="inherit"
          >
            Track history
          </Button>
        ) : null}
        {user ? <UserMenu user={user} /> : <AnonimusMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
