import React, { lazy, Suspense, useCallback } from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { selectIsSidebarOpen } from "@/redux/features/sidebar/sidebar.selector";
 
const SidebarDrawer = lazy(() => import("./SidebarDrawer"));

// eslint-disable-next-line react-refresh/only-export-components
function Sidebar() {
  const dispatch = useDispatch();
  const open = useSelector(selectIsSidebarOpen);

  // Memoize the handler to avoid unnecessary re-renders
  const handleOpenSidebar = useCallback(() => {
    dispatch(openSidebar());
  }, [dispatch]);

  if (open) {
    return (
      <Suspense fallback={null}>
        <SidebarDrawer />
      </Suspense>
    );
  }

  return (
    <IconButton
      component="button"
      id="btn-dashboard-sidebarHideShow-toggle"
      sx={{
        mt: 2,
        p: 0,
        width: 40,
        height: 40,
        color: "black",
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      onClick={handleOpenSidebar}
      aria-label="Open sidebar"
    >
      <ChevronRightIcon fontSize="medium" />
    </IconButton>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withErrorBoundary(
  React.memo(Sidebar),
  "Sidebar component has some Errors"
);
