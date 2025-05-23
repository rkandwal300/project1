import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarDrawer from "./SidebarDrawer";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);
  if (open) return <SidebarDrawer open={open} toggleDrawer={toggleDrawer} />;
  return (
    <IconButton
      id="btn-dashboard-sidebarHideShow-toggle"
      onClick={toggleDrawer(true)}
      sx={{
        maxHeight: "5vh",
        maxWidth: "2vw",
        position: "fixed",
        top: 80,
        left: 10,
        zIndex: 1300,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <ChevronRightIcon />
    </IconButton>
  );
}
