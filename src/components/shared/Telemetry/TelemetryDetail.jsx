import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CustomTable from "@/components/ui/table/CustomTable";
import { selectCurrentInstance } from "@/redux/features/instanceList/instanceList.selector";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentProviderName,
  selectCurrentProviderType,
} from "@/redux/features/providerData/providerData.selector";
import GetInstanceColumn from "../PortfolioTable/portfolioColumn";

function TelemetryDetail() {
  const navigate = useNavigate();
  const currentProviderName = useSelector(selectCurrentProviderName);
  const currentProviderType = useSelector(selectCurrentProviderType);

  const data = useSelector(selectCurrentInstance);
  if (!data) {
    return navigate(
      `/${currentProviderType}?type=${currentProviderName}`
    );
  }
  const columns = GetInstanceColumn({isTelemetry : true});
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
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.3rem",
          ml: 1, // equivalent to margin-left: 8px
          mt: "5px",
        }}
      >
        List of Instances
      </Typography>
      <CustomTable
        variant="primary"
        data={data.data}
        columns={columns}
        isPagination
      />
    </Box>
  );
}

export default TelemetryDetail;
