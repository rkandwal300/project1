import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useSelector } from "react-redux";
import { ExportToCSV } from "@/lib/ExportToCsv";

const ExplorerHeader = () => {
  const theme = useTheme();
  const tableData = useSelector((state) => state.explorerData.data);

  const handleExport = () => {
    ExportToCSV(tableData, "amd-explorer-data.csv");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: theme.palette.text.primary,
        px: 1.5,
      }}
    >
      <Box sx={{ flexGrow: 1, pt: 1, width: { xs: "100%", md: "200px" } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "600",
            fontSize: "24px",
            color: theme.palette.text.primary,
          }}
        >
          Explorer
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          Explore a wide range of AMD instances across various cloud service
          providers, with details such as vCPU count, memory, pricing, and
          region
        </Typography>
      </Box>

      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon />}
        sx={{ textTransform: "none", pl: 2 }}
        onClick={handleExport}
        disabled={!tableData || tableData.length === 0}
      >
        Export
      </Button>
    </Box>
  );
};

export default ExplorerHeader;
