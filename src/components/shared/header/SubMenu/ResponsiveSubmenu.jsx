import { useState } from "react";
import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from "@mui/icons-material/Article";
import BookIcon from "@mui/icons-material/Book";

function ResponsiveSubMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const menuItems = [
    { label: "Stat collector", icon: <CloudDownloadIcon /> },
    { label: "User Guide", icon: <BookIcon /> },
    { label: "Help", icon: <HelpIcon /> },
    { label: "About", icon: <InfoIcon /> },
    { label: "Release Note", icon: <ArticleIcon /> },
    { label: "Support", icon: <SupportIcon /> },
    { label: "Logout", icon: <LogoutIcon /> },
  ];
  return (
    <>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {menuItems.map(({ label, icon }) => (
          <MenuItem key={label} onClick={handleMenuClose}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {icon}
              {label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ResponsiveSubMenu;
