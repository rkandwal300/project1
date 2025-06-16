import { Box } from "@mui/material";
import React from "react";
import DatadogForm from "./DatadogForm";
import { useSelector } from "react-redux";
import { selectTelemetryState } from "@/redux/features/telemetry/telemetry.selector";
import { telemetryColumns } from "./telemetryColumns";
import CustomTable from "@/components/ui/table/CustomTable";

function TelemetryLayout () {
  const { data, showData } = useSelector(selectTelemetryState); 
  
  return (
    <Box
      sx={{
        flex: 1,
        p: 0,
        overflowY: "auto",
        bgcolor: "error.contrastText",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: 2,
        }}
      >
        <DatadogForm />
        
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
    </Box>
  );
}

export default TelemetryLayout;
