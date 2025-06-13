import React, { useEffect, useCallback } from "react";
import {
  Box,
  Divider,
  useTheme,
  IconButton,
  Typography,
  List,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarSelect from "@/components/shared/Sidebar/SidebarSelect";
import TooltipHoc from "@/components/ui/Tooltip";
import { closeSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";
import { resetInstanceState } from "@/redux/features/instance/instance.slice";
import { selectInstanceList } from "@/redux/features/instanceList/instanceList.selector";
import { selectInstances } from "@/redux/features/instance/instance.selector";
import PortfolioItem from "./PortfolioItem";

const SidebarDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const instances = useSelector(selectInstances);
  const portfolios = useSelector(selectInstanceList);

  const borderColor = theme.palette.sidebar?.border || theme.palette.divider;

  // Ensure at least one instance is present
  useEffect(() => {
    if (instances.length === 0) {
      dispatch(addCurrentInstance(null));
    }
  }, [dispatch, instances.length]);

  // Handlers
  const handleCloseSidebar = useCallback(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  const handleOpenNewForm = useCallback(() => {
    dispatch(addCurrentInstance(null));
    dispatch(resetInstanceState());
    navigate("/");
  }, [dispatch, navigate]); 

  return (
    <Box
      id="sidebar-drawer"
      aria-label="sidebar-drawer"
      bgcolor="inherit"
      sx={{
        
        width: { xs: 123, sm:168, md: 262 , lg:273},
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
          minHeight: "74px",
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

      <Divider  />

      {/* Portfolios section header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        fontWeight={500}
        height="2.5rem"
      >
        <Typography sx={{ pl: 1 }}>Portfolios</Typography>
        <TooltipHoc message="Create New Portfolio">
          <IconButton
            onClick={handleOpenNewForm}
            id="btn-dashboard-createPortfolio"
            aria-label="Create New Portfolio"
            size="small"
            sx={{
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <AddCircleIcon fontSize="small" />
          </IconButton>
        </TooltipHoc>
      </Box>

      {/* Portfolio list */}
      <Box sx={{ height: "70vh", overflowY: "auto" }}>
        <List id="dashboard-portfolio-list">
          {portfolios.map((portfolio) => (
            <PortfolioItem key={portfolio.id} portfolio={portfolio} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SidebarDrawer;
