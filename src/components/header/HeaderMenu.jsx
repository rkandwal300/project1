import * as React from "react";
import { Box, IconButton, MenuItem, Tooltip, useTheme } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuHoc from "../ui/Menu"; 

const iconButtonStyle = {
  color: "primary.contrastText",
  bgcolor: "transparent",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.1)",
  },
};

 


export default function HeaderMenus() {
  const theme = useTheme();
  const tooltipProps = {
    componentsProps: {
      tooltip: {
        sx: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.contrastText,
          fontSize: 12,
          padding: "6px 12px",
          borderRadius: 1,
          boxShadow: 3,
        },
      },
    },
  };
  const menus = [
    {
      key: "docs",
      icon: <DescriptionIcon />,
      iconStyle: iconButtonStyle,
      items: ["Tools & Training", "Help Guidelines"],
      tooltiptitle: "Document",
    },
    {
      key: "support",
      icon: <HeadsetMicIcon sx={{ transform: "translateX(2px)" }} fontSize="small" />,
      iconStyle: iconButtonStyle,
      items: ["Support", "Rise Issue","Feedback Form"],
      tooltiptitle: "Support"
    },
    {
      key: "account",
      icon: <AccountCircleIcon />,
      iconStyle: iconButtonStyle,
      items: ["Profile", "Settings", "Logout"],
      tooltiptitle: "Profile"
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, ml: "auto" , alignItems:"center" }}>
      {menus.map((menu) => (
        <MenuHoc
          key={menu.key}
          trigger={({ onClick }) => (
             <Tooltip title={menu.tooltiptitle} {...tooltipProps}>
            <IconButton sx={menu.iconStyle} onClick={onClick}>
              {menu.icon}
            </IconButton>
            </Tooltip>
          )}
          content={({ onClose }) => (
            <>
              {menu.items.map((label) => (
                <MenuItem key={label} onClick={onClose}>
                  {label}
                </MenuItem>
              ))}
            </>
          )}
        />
      ))}
    </Box>
  );
}
