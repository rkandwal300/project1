import React, { useState } from "react";
import {  IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarDrawer from "./SidebarDrawer";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);
  if (open) return <SidebarDrawer open={open} toggleDrawer={toggleDrawer} />;
  return (
    <IconButton
      component="button"
      id="btn-dashboard-sidebarHideShow-toggle"
      sx={{ 
        mt: 2,
        padding:0,
        width: "40px",
        height: "40px",
        color: "black",
        "&:hover": {
          backgroundColor: "transparent",
        }
      }}
      onClick={toggleDrawer(true)}
    >
      <ChevronRightIcon fontSize="medium" />
    </IconButton>
  );
}
