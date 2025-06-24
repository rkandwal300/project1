import PropTypes from "prop-types";
import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { TELEMETRY_TYPES } from "@/redux/features/telemetry/telemetry.slice";
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";
import CloudwatchGuide from "./CloudwatchGuide";
import AzureInsightsGuide from "./AzureInsightsGuide";
import DatadogGuide from "./DatadogGuide";  
const lablelist = ["Manage Portfolio", "Add Instances via Telemetry Connector (Datadog)", "Add Instances via Telemetry Connector (AWS CloudWatch)","Add Instances via Telemetry Connector (AZURE APP INSIGHTS)", ];
export default function HelpDialogContent({ onClose }) { 
  const portfolioName = useSelector(selectCurrentProviderName);
  let label =  lablelist[0]
  let Component = () => <></>;
  switch (portfolioName) {
    case TELEMETRY_TYPES.DATA_DOG:
      label = lablelist[1];
      Component = DatadogGuide;
      break;
    case TELEMETRY_TYPES.AWS_CLOUDWATCH:
      label = lablelist[2];
      Component = CloudwatchGuide;
      break;
    case TELEMETRY_TYPES.AZURE_INSIGHTS:
      label = lablelist[2];
      Component = AzureInsightsGuide;
      break;
    default:
      label = lablelist[0];
      Component = CloudwatchGuide;
  }
  

  return (
    <Box sx={{ p: 0 }} gap={0}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        p={2} 
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {label}
        </Typography>

        {/* Close Button */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Component />
    </Box>
  );
}

HelpDialogContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};
