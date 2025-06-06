import React from "react";
import { Box, Divider, useTheme, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SidebarSelect from "@/components/shared/Sidebar/SidebarSelect";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioList from "./PortfolioList";
import { serviceProviderOptions } from "@/lib/constant";
import { closeSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { useDispatch } from "react-redux";

export default function SidebarDrawer() {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = React.useState(
    serviceProviderOptions[0].options[0].value
  );
  const theme = useTheme();
  const borderColor = theme.palette.sidebar?.border || theme.palette.divider;
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
        <SidebarSelect
          label="Service Provider"
          value={selectValue}
          onValueChange={({ target }) => setSelectValue(target.value)}
        />
        <IconButton
          id="btn-dashboard-togglePortfolios"
          onClick={()=>dispatch(closeSidebar())}
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

      <PortfolioHeader />
      <PortfolioList />
    </Box>
  );
}
