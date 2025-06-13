import React, { useCallback } from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarDrawer from "./SidebarDrawer";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { selectIsSidebarOpen } from "@/redux/features/sidebar/sidebar.selector";

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  const handleOpenSidebar = useCallback(() => {
    dispatch(openSidebar());
  }, [dispatch]);

  if (isSidebarOpen) return <SidebarDrawer />;

  return (
    <IconButton
      sx={{
        mt: 2,
        p: 0,
        width: 40,
        height: 40,
        color: "theme.palette.black",
        "&:hover": { backgroundColor: "transparent" },
      }}
      onClick={handleOpenSidebar}
      aria-label="Open sidebar"
    >
      <ChevronRightIcon fontSize="large" />
    </IconButton>
  );
};

const Sidebar = withErrorBoundary(
  SidebarComponent,
  "Sidebar component has some errors"
);

export default Sidebar;
