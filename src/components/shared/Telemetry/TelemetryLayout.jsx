import { Box } from "@mui/material";
import React from "react";
import DatadogForm from "./DatadogForm";
import { useSelector } from "react-redux";
import { selectTelemetryState } from "@/redux/features/telemetry/telemetry.selector";
import { telemetryColumns } from "./telemetryColumns";
import CustomTable from "@/components/ui/table/CustomTable";
import { useLocation } from "react-router-dom";
import { telemetryTypes } from "@/redux/features/telemetry/telemetry.slice";
import AzureInsightsForm from "./AzureInsightsForm";

function TelemetryLayout() {
  const { data, showData } = useSelector(selectTelemetryState);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");


  return (
    <Box
      sx={{
        height: "fit-content",
        overflowY: "auto",
        bgcolor: "error.contrastText",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >{type ===  telemetryTypes.AZURE_INSIGHTS ?<AzureInsightsForm />:
      <DatadogForm />}

      {showData && (
        <CustomTable
          variant="primary"
          data={data}
          columns={telemetryColumns}
          isPagination
          id="instance-advice-table"
        />
      )}
    </Box>
  );
}

export default TelemetryLayout;
