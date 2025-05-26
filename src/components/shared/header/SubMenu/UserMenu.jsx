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
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic"; 
import DialogHoc from "@/components/ui/Dialog";

function UserMenu() {
  const theme = useTheme();

  const textColor = theme.palette.error.contrastText;

  const menuItemStyles = {
    color: textColor,
  };

  const iconStyles = {
    color: textColor,
    minWidth: '36px', // consistent icon alignment
  };

  const items = [
    {
      label: "User Profile",
      value: "#",
      type: "link",
      icon: <AccountCircleIcon />,
    },
    {
      label: "User Guide",
      value: "https://eia-prod.amd.com/assets/EIA%20User%20Guide-ywdnNCnh.pdf",
      type: "link",
      icon: <MenuBookIcon />,
    },
    {
      label: "Help",
      value: "Help content goes here...",
      type: "dialog",
      icon: <HelpIcon />,
    },
    {
      label: "About",
      value: "About content goes here...",
      type: "dialog",
      icon: <InfoIcon />,
    },
    {
      label: "Release Date",
      value: "Release date: May 2025",
      type: "dialog",
      icon: <DescriptionIcon />,
    },
    {
      label: "Support",
      value: "Support info goes here...",
      type: "dialog",
      icon: <HeadsetMicIcon />,
    },
  ];

  return (
    <>
      {items.map((val) =>
        val.type === "link" ? (
          <MenuItem
            key={val.label}
            component="a"
            href={val.value}
            target="_blank"
            rel="noopener noreferrer"
            sx={menuItemStyles}
          >
            <ListItemIcon sx={iconStyles}>{val.icon}</ListItemIcon>
            <ListItemText primary={val.label} />
          </MenuItem>
        ) : (
          <DialogHoc
            key={val.label}
            trigger={(onClick) => (
              <MenuItem onClick={onClick} sx={menuItemStyles}>
                <ListItemIcon sx={iconStyles}>{val.icon}</ListItemIcon>
                <ListItemText primary={val.label} />
              </MenuItem>
            )}
            content={()=>val.value}
          />
        )
      )}
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
