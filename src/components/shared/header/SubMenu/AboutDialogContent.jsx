//  HelpDialogContent
import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 

export default function AboutDialogContent({ onClose }) {
  return (
    <Box sx={{ p: 0 }} gap={0} color={"primary.main"}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          About Cloud Instance Advisor
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box p={2} overflow={"auto"} maxHeight="70vh">
        {/* Intro Paragraph */}
        <Typography mt={2}>
          Cloud Instance Advisor is a powerful recommendation engine designed to
          analyze historical system statistics and provide optimal instance
          recommendations.
        </Typography>

        {/* Note */}
        <Typography mt={2}>
          <span>
            {" "}
            To get started, download the Stat Collector package by clicking the
          </span>
          {""}
          <strong>"Stat Collector"</strong>
          {""}
          <span>
            This package includes executables that gather essential system
            statistics such as CPU, memory, network, and I/O utilization. For
            detailed instructions, refer to
          </span>{" "}
          <a href="https://cca-prod.amd.com/tools/README.txt">Readme.txt</a>{" "}
          <span> file in the downloaded package</span>
        </Typography>

        {/* Main Feature List */}
        <Typography mt={2}>
          Once you've collected the system statistics, upload the generated
          files to receive tailored instance recommendations. You can upload a
          single XLSX file containing statistics for multiple systems or use the
          downloadable template to input the required details manually.
        </Typography>
      </Box>
    </Box>
  );
}
