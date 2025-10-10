import * as React from "react";
import { Box, IconButton, MenuItem, useTheme } from "@mui/material";
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
  const menus = [
    {
      key: "docs",
      icon: <DescriptionIcon />,
      iconStyle: iconButtonStyle,
      items: ["Documents", "Reports"],
    },
    {
      key: "support",
      icon: <HeadsetMicIcon sx={{ transform: "translateX(2px)" }} fontSize="small" />,
      iconStyle:iconButtonStyle,
      items: ["Contact Support", "FAQs"],
    },
    {
      key: "account",
      icon: <AccountCircleIcon />,
      iconStyle: iconButtonStyle,
      items: ["Profile", "Settings", "Logout"],
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, ml: "auto" }}>
      {menus.map((menu) => (
        <MenuHoc
          key={menu.key}
          trigger={({ onClick }) => (
            <IconButton sx={menu.iconStyle} onClick={onClick}>
              {menu.icon}
            </IconButton>
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
