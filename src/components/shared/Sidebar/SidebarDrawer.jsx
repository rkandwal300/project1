import React, { useState, Suspense, lazy } from "react";
import { Box, Divider, useTheme, IconButton, CircularProgress } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { serviceProviderOptions } from "@/lib/constant";
import { closeSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { useDispatch } from "react-redux";

// Lazy load components
const SidebarSelect = lazy(() => import("@/components/shared/Sidebar/SidebarSelect"));
const PortfolioHeader = lazy(() => import("./PortfolioHeader"));
const PortfolioList = lazy(() => import("./PortfolioList"));

export default function SidebarDrawer() {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState(serviceProviderOptions[0].options[0].value);
  const theme = useTheme();
  const borderColor = theme.palette.sidebar?.border || theme.palette.divider;

  const handleSelectChange = React.useCallback(
    ({ target }) => setSelectValue(target.value),
    []
  );

  const handleCloseSidebar = React.useCallback(
    () => dispatch(closeSidebar()),
    [dispatch]
  );

  return (
    <Box
      bgcolor="inherit"
      sx={{
        mt: 1,
        width: { xs: 201, md: 262 },
        flexShrink: 0,
        borderRight: `1px solid ${borderColor}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", pt: 2, pl: "4px" }}>
        <Suspense fallback={<CircularProgress size={24} />}>
          <SidebarSelect
            label="Service Provider"
            value={selectValue}
            onValueChange={handleSelectChange}
          />
        </Suspense>
        <IconButton
          id="btn-dashboard-togglePortfolios"
          onClick={handleCloseSidebar}
          sx={{
            ml: "auto",
            p: 0,
            color: "black",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Suspense fallback={<CircularProgress size={24} />}>
        <PortfolioHeader />
        <PortfolioList />
      </Suspense>
    </Box>
  );
}
