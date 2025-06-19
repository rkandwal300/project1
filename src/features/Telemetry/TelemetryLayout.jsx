import { Box } from "@mui/material";
import React, {  lazy } from "react";
import { useSelector } from "react-redux";
import { selectTelemetryState } from "@/redux/features/telemetry/telemetry.selector";
import { telemetryColumns } from "./telemetryColumns";
import CustomTable from "@/components/table/CustomTable";
import { useLocation } from "react-router-dom";
import { TELEMETRY_TYPES } from "@/redux/features/telemetry/telemetry.slice";

// Lazy load the forms
const DatadogForm = lazy(() => import("./DatadogForm"));
const AzureInsightsForm = lazy(() => import("./AzureInsightsForm"));

function TelemetryLayout() {
  const { data, showData } = useSelector(selectTelemetryState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

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
      {type === TELEMETRY_TYPES.AZURE_INSIGHTS ? (
        <AzureInsightsForm />
      ) : (
        <DatadogForm />
      )}

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
