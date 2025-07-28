import { Box } from "@mui/material";
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { selectTelemetryState } from "@/redux/features/telemetry/telemetry.selector";
import { telemetryColumns } from "./telemetryColumns";
import CustomTable from "@/components/ui/table/CustomTable";
import { useLocation } from "react-router-dom";
import { TELEMETRY_TYPES } from "@/redux/features/telemetry/telemetry.slice";
import GCPTelemetry from "./GCPTelemetry";
import PrometheusTelemetry from "./Prometheus";

// Lazy load the forms
const DatadogForm = lazy(() => import("./DatadogForm"));
const AzureInsightsForm = lazy(() => import("./AzureInsightsForm"));

function TelemetryLayout() {
  const { data, showData } = useSelector(selectTelemetryState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type"); 
  const renderForm = () => {
    switch (type) {
      case TELEMETRY_TYPES.AZURE_INSIGHTS:
        return <AzureInsightsForm />;
      case TELEMETRY_TYPES.AWS_CLOUDWATCH:
        return <AzureInsightsForm />;
      case TELEMETRY_TYPES.DATA_DOG:
        return <DatadogForm />;
      case TELEMETRY_TYPES.GOOGLE_CLOUD_OPS:
        return <GCPTelemetry />;
      case TELEMETRY_TYPES.PROMETHEUS:
        return <PrometheusTelemetry />;
      default:
        return null;
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {renderForm()}

      {showData && (
        <CustomTable
          variant="primary"
          data={data}
          columns={telemetryColumns}
          isPagination
        />
      )}
    </Box>
  );
}

export default TelemetryLayout;
