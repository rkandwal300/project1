import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { telemetryColumns } from "./telemetryColumns";
import CustomTable from "@/components/ui/table/CustomTable";
import { selectCurrentInstance } from "@/redux/features/instanceList/instanceList.selector";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentProviderName,
  selectCurrentProviderType,
} from "@/redux/features/providerData/providerData.selector";

function TelemetryDetail() {
  const navigate = useNavigate();
  const currentProviderName = useSelector(selectCurrentProviderName);
  const currentProviderType = useSelector(selectCurrentProviderType);

  const data = useSelector(selectCurrentInstance);
  if (!data) {
    return navigate(`/${currentProviderType}?type=${currentProviderName}`);
  }

  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        overflowY: "auto",
        bgcolor: "error.contrastText",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CustomTable
        variant="primary"
        data={data.data}
        columns={telemetryColumns}
        isPagination
        id="instance-advice-table"
      />
    </Box>
  );
}

export default TelemetryDetail;
