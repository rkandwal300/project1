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
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";

function UserMenu() {
  const theme = useTheme();

  const textColor = theme.palette.text.primary;

  const menuItemStyles = {
    color: textColor,
  };

  const iconStyles = {
    color: textColor,
  };

  const items = [
    {
      label: "User Profile",
      value: "",
      type: "link",
      action: () => {},
      icon: <AccountCircleIcon />,
    },
    {
      label: "User Guide",
      value: "",
      type: "link",
      action: () => {},
      icon: <MenuBookIcon />,
    },
    {
      label: "Help",
      value: "",
      type: "dialog",
      action: () => {},
      icon: <HelpIcon />,
    },
    {
      label: "About",
      value: "",
      type: "dialog",
      action: () => {},
      icon: <InfoIcon />,
    },
    {
      label: "Release Date",
      value: "",
      type: "dialog",
      action: () => {},
      icon: <DescriptionIcon />,
    },
    {
      label: "Support",
      value: "",
      type: "dialog",
      action: () => {},
      icon: <HeadsetMicIcon />,
    },
  ];
  return (
    <>
      {items.map((val) => (
        <MenuItem key={val.label} sx={menuItemStyles}>
          <ListItemIcon sx={iconStyles}>
            {val.icon}
          </ListItemIcon>
          <ListItemText primary={val.label} />
        </MenuItem>
      ))}
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
