import React from "react";
import {

  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material"; 
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";

function UserMenu() {
  const theme = useTheme();

  const textColor = theme.palette.text.primary;

  const menuItemStyles = {
    color: textColor,
  };

  const iconStyles = {
    color: textColor,
  };
  return (
    <> 
      <MenuItem sx={menuItemStyles}>
        <ListItemIcon sx={iconStyles}>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="User Profile" />
      </MenuItem>
      <MenuItem sx={menuItemStyles}>
        <ListItemIcon sx={iconStyles}>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="User Guide" />
      </MenuItem>
      <MenuItem sx={menuItemStyles}>
        <ListItemIcon sx={iconStyles}>
          <HelpOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Online Documentation" />
      </MenuItem>
      <MenuItem sx={menuItemStyles}>
        <ListItemIcon sx={iconStyles}>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </MenuItem>
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <MenuItem sx={menuItemStyles}>
        <ListItemIcon sx={iconStyles}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </>
  );
}

export default UserMenu;
