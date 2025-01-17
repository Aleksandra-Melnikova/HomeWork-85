import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import { unsetUser } from '../../../features/users/UserSlice.ts';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logout } from '../../../features/users/UserThunk.ts';


interface Props {
  user: User;
}


const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
 const dispatch = useAppDispatch();


  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleLogout = ()=>{
    dispatch(logout());
    dispatch(unsetUser());
  }

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick = {HandleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};



export default UserMenu;