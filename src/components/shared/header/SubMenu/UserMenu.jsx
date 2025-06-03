import React, { Suspense, lazy, useMemo } from "react";
import {
  MenuItem,
  Divider,
  useTheme,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import DialogHoc from "@/components/ui/Dialog";

// Lazy load dialog content components
const AboutDialogContent = lazy(() => import("./AboutDialogContent"));
const HelpDialogContent = lazy(() => import("./HelpDialogContent"));

const menuConfig = [
  {
    label: "Profile",
    value: "https://epycadvisory.amd.com/profile/request-role?appName=EIA",
    type: "link",
    icon: <AccountCircleIcon />,
  },
  {
    label: "User Guide",
    value: "https://eia-prod.amd.com/assets/EIA%20User%20Guide-UyjIb5PG.pdf",
    type: "link",
    icon: <MenuBookIcon />,
  },
  
  {
    label: "About",
    icon: <InfoIcon />,
    type: "dialog",
    component: AboutDialogContent,
  },
  {
    label: "Online Documentation",
    icon: <HelpIcon />,
    type: "dialog",
    component: HelpDialogContent,
  },
];

function UserMenu({ onClose }) {
  const theme = useTheme();

  // Memoize menu items for performance
  const items = useMemo(() => menuConfig, []);

  // Reusable menu item node
  const Node = ({ icon, label, onClick }) => (
    <MenuItem
      onClick={onClick}
      sx={{
        borderBottom: "1px solid transparent",
        borderRadius: 0,
        cursor: "pointer",
      }}
    >
      <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  );

  return (
    <>
      {items.map(({ label, icon, type, value, component }) => {
        if (type === "dialog") {
          const DialogComponent = component;
          return (
            <DialogHoc
              key={label}
              trigger={({ onClick: openDialog }) => (
                <Node
                  icon={icon}
                  label={label}
                  onClick={() => setTimeout(openDialog, 0)}
                />
              )}
              content={({ handleClose }) => (
                <Suspense fallback={<Box p={2}><CircularProgress size={24} /></Box>}>
                  <DialogComponent onClose={handleClose} />
                </Suspense>
              )}
            />
          );
        }
        if (type === "link") {
          return (
            <MenuItem
              sx={{
                borderBottom: "1px solid transparent",
                borderRadius: 0,
                cursor: "pointer",
              }}
              key={label}
              component="a"
              href={value}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </MenuItem>
          );
        }
        return (
          <Node key={label} icon={icon} label={label} onClick={onClose} />
        );
      })}
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <MenuItem
        component="a"
        href="https://eia-prod.amd.com"
        target="_blank"
        sx={{
          borderBottom: "1px solid transparent",
          borderRadius: 0,
          cursor: "pointer",
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Log Out"} />
      </MenuItem>
    </>
  );
}

export default UserMenu;
