import React from "react";
import { 
  Box,
  Divider, 
} from "@mui/material"; 
import PortfolioFormHeader from "./PortfolioFormHeader";
import GenericMetadata from "./GenericMetadata";
import ConsumptionMetadata from "./ConsumptionMetadata";
import { useTheme } from "@emotion/react";

const PortfolioForm = () => {
  const theme = useTheme();
 const bgcolor = theme.palette.primary.contrastText;
  return (
    <Box p={2} width="100%" sx={{
      bgcolor,
    }}>
      <PortfolioFormHeader />
      <Divider />
      <GenericMetadata/>
      <ConsumptionMetadata/>
    </Box>
  );
};

export default PortfolioForm;
