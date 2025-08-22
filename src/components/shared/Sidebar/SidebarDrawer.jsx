import React, { useEffect, useCallback, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  List,
  useTheme,
  Switch,
  TextField,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import SidebarSelect from "@/components/shared/Sidebar/SidebarSelect";
import TooltipHoc from "@/components/ui/Tooltip";
import PortfolioItem from "./PortfolioItem";

import { closeSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { resetInstanceState } from "@/redux/features/instance/instance.slice";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";
import {
  selectCurrentProviderName,
  selectCurrentProviderType,
} from "@/redux/features/providerData/providerData.selector";
import { selectInstanceList } from "@/redux/features/instanceList/instanceList.selector";
import { resetTelemetryData } from "@/redux/features/telemetry/telemetry.slice";
import { ROUTES } from "@/lib/router";

const SidebarDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const portfolio = useSelector(selectCurrentProviderName);
  const portfolioType = useSelector(selectCurrentProviderType);
  const instances = useSelector(selectInstanceList);
  const [portfolioFilter, setPortfolioFilter] = useState(false);

  const data = instances.filter((instance) => instance.provider === portfolio);

  const borderColor = theme.palette.sidebar?.border || theme.palette.divider;
  useEffect(() => {
    if (instances.length === 0) {
      dispatch(addCurrentInstance(null));
    }
  }, [instances.length, dispatch]);

  const handleCloseSidebar = useCallback(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  const handleOpenNewForm = useCallback(() => {
    dispatch(addCurrentInstance(null));
    if (portfolioType === "telemetry") {
      dispatch(resetTelemetryData());
    } else {
      dispatch(resetInstanceState());
    }

    const basePath = location.pathname.includes("telemetry")
      ? ROUTES.TELEMETRY
      : ROUTES.ROOT;

    navigate(`${basePath}?type=${portfolio}`);
  }, [dispatch, location.pathname, navigate, portfolio, portfolioType]);

  return (
    <Box
      id="sidebar-drawer"
      aria-label="sidebar-drawer"
      sx={{
        width: { xs: 123, sm: 168, md: 262, lg: 273 },
        flexShrink: 0,
        borderRight: `1px solid ${borderColor}`,
        bgcolor: "sidebar.background",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pt: 2,
          pl: 0.5,
          minHeight: 74,
        }}
      >
        <SidebarSelect />
        <IconButton
          id="btn-dashboard-togglePortfolios"
          aria-label="Close sidebar"
          onClick={handleCloseSidebar}
          sx={{
            ml: "auto",
            p: 0,
            color: "black",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
      </Box>

      <Divider />

      {/* Portfolios Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        height="2.5rem"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <Switch
            value={portfolioFilter}
            onClick={() => setPortfolioFilter((prev) => !prev)}
          />
          <Typography sx={{ fontWeight: 600 }}>
            {portfolioFilter ? "Team Portfolios" : "My Portfolios"}
          </Typography>
        </Box>
        <TooltipHoc message="Create New Portfolio">
          <IconButton
            id="btn-dashboard-createPortfolio"
            aria-label="Create New Portfolio"
            onClick={handleOpenNewForm}
            size="small"
            sx={{
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </TooltipHoc>
      </Box>
      {/* Portfolio List */}
      <Box sx={{ height: "70vh", overflowY: "auto" }}>
        <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
          <TextField placeholder="Search Portfolio" />
        </div>
        <List id="dashboard-portfolio-list">
          {data.map((portfolio) => (
            <PortfolioItem key={portfolio.id} portfolio={portfolio} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SidebarDrawer;
