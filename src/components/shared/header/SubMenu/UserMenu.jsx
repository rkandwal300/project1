import React, { Suspense, lazy, useMemo, useCallback } from "react";
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
import PropTypes from "prop-types";

// Dynamic import map for dialog components
const dialogComponentMap = {
  AboutDialogContent: () => import("./AboutDialogContent"),
  HelpDialogContent: () => import("./HelpDialogContent"),
};

// Menu configuration with dialog component keys
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
    componentKey: "AboutDialogContent",
  },
  {
    label: "Online Documentation",
    icon: <HelpIcon />,
    type: "dialog",
    componentKey: "HelpDialogContent",
  },
];

function UserMenu({ onClose }) {
  const theme = useTheme();

  // Memoize menu items for performance
  const items = useMemo(() => menuConfig, []);

  // Memoized Node component
  const Node = useCallback(({ icon, label, onClick }) => (
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
  ), []);

  // Memoized dialog loader
  const getDialogComponent = useCallback((componentKey) => {
    const LazyComponent = lazy(dialogComponentMap[componentKey]);
    return LazyComponent;
  }, []);

  return (
    <>
      {items.map(({ label, icon, type, value, componentKey }) => {
        if (type === "dialog" && componentKey) {
          const DialogComponent = getDialogComponent(componentKey);
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
        id="logout-link"
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

UserMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default React.memo(UserMenu);
