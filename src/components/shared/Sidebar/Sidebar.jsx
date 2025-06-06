import React from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarDrawer from "./SidebarDrawer";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { selectIsSidebarOpen } from "@/redux/features/sidebar/sidebar.selector";

function Sidebar() {
  const dispatch = useDispatch();
  const open = useSelector(selectIsSidebarOpen);
  if (open) return <SidebarDrawer />;
  return (
    <IconButton
      component="button"
      id="btn-dashboard-sidebarHideShow-toggle"
      sx={{
        mt: 2,
        padding: 0,
        width: "40px",
        height: "40px",
        color: "black",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      onClick={() => dispatch(openSidebar())}
    >
      <ChevronRightIcon fontSize="medium" />
    </IconButton>
  );
}

const SidebarWithBoundary = withErrorBoundary(
  Sidebar,
  "Sidebar component has some Errors"
);

export default SidebarWithBoundary;
