import { IconButton, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from "@mui/icons-material/Article";
import BookIcon from "@mui/icons-material/Book";
import MenuHoc from "@/components/ui/Menu";

function ResponsiveSubMenu() {
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
    <MenuHoc
      trigger={({ onClick }) => (
        <IconButton color="inherit" onClick={onClick}>
          <MenuIcon />
        </IconButton>
      )}
      content={({ onClose }) =>
        menuItems.map(({ label, icon }) => (
          <MenuItem key={label} onClick={onClose}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {icon}
              {label}
            </Box>
          </MenuItem>
        ))
      }
    />
  );
}

export default ResponsiveSubMenu;
