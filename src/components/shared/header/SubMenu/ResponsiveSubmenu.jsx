import { IconButton, MenuItem, Box, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from "@mui/icons-material/Article";
import BookIcon from "@mui/icons-material/Book";
import MenuHoc from "@/components/ui/Menu";
import { lazy, Suspense, useMemo } from "react";
import UserGuidePDF from "@/assets/EIA_User_Guide.pdf";

// Lazy load dialogs
const DialogHoc = lazy(() => import("@/components/ui/Dialog"));
const SupportDialog = lazy(() => import("./SupportDialog"));
const HelpDialogContent = lazy(() => import("./HelpDialogContent"));
const AboutDialogContent = lazy(() => import("./AboutDialogContent"));
const ReleaseNotes = lazy(() => import("./ReleaseNotes/ReleaseNotes"));

const DIALOG_COMPONENTS = {
  Help: HelpDialogContent,
  About: AboutDialogContent,
  "Release Note": ReleaseNotes,
  Support: SupportDialog,
};

import PropTypes from "prop-types";
import UserGuideContent from "./userGuideContent";

function DialogMenuItem(props) {
  const { label, icon, DialogComponent } = props;
  return (
    <DialogHoc
      trigger={({ onClick: openDialog }) => (
        <MenuItem
          onClick={() => {
            setTimeout(openDialog, 0);
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {icon}
            {label}
          </Box>
        </MenuItem>
      )}
      content={({ handleClose }) => (
        <Suspense fallback={null}>
          <DialogComponent onClose={handleClose} handleClose={handleClose} />
        </Suspense>
      )}
    />
  );
}

DialogMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  DialogComponent: PropTypes.elementType.isRequired,
  onClose: PropTypes.func,
};

function LinkMenuItem({ label, icon, href }) {
  return (
    <MenuItem
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        {label}
      </Box>
    </MenuItem>
  );
}

function ResponsiveSubMenu() {
  const menuItems = useMemo(
    () => [
      { label: "Stat collector", icon: <CloudDownloadIcon /> },
      // {
      //   label: "User Guide",
      //   icon: <BookIcon />,
      //   type: "link",
      //   value: UserGuidePDF,
      // },
      {
        label: "Help",
        icon: <HelpIcon />,
        type: "dialog",
      },
      {
        label: "About",
        icon: <InfoIcon />,
        type: "dialog",
      },
      // {
      //   label: "Release Note",
      //   icon: <ArticleIcon />,
      //   type: "dialog",
      // },
      {
        label: "Support",
        icon: <SupportIcon />, 
             type: "link",
        value: "/support",
      },
    ],
    []
  );

  return (
    <MenuHoc
      trigger={({ onClick }) => (
        <IconButton color="inherit" onClick={onClick}>
          <MenuIcon />
        </IconButton>
      )}
      content={({ onClose }) => (
        <>
          {menuItems.map(({ label, icon, type, value }) => {
            if (type === "dialog" && DIALOG_COMPONENTS[label]) {
              const DialogComponent = DIALOG_COMPONENTS[label];
              return (
                <DialogMenuItem
                  key={label}
                  label={label}
                  icon={icon}
                  DialogComponent={DialogComponent}
                  onClose={onClose}
                />
              );
            }
            if (type === "link") {
              return (
                <LinkMenuItem
                  key={label}
                  label={label}
                  icon={icon}
                  href={value}
                />
              );
            }
            // Default: just close menu
            return (
              <MenuItem key={label} onClick={onClose}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {icon}
                  {label}
                </Box>
              </MenuItem>
            );
          })}
          <Divider sx={{ my: 1 }} />
          <MenuItem rel="noopener noreferrer">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LogoutIcon />
              {"Log Out"}
            </Box>
          </MenuItem>
        </>
      )}
    />
  );
}

export default ResponsiveSubMenu;
