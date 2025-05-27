import React from "react";
import { 
  Box,
  Divider, 
} from "@mui/material"; 
import PortfolioFormHeader from "./PortfolioFormHeader";
import GenericMetadata from "./GenericMetadata";
import ConsumptionMetadata from "./ConsumptionMetadata";

const PortfolioForm = () => {
  return (
    <Box p={2} width="100%">
      <PortfolioFormHeader />
      <Divider />
      <GenericMetadata/>
      <ConsumptionMetadata/>
    </Box>
  );
};

export default PortfolioForm;
