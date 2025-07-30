//  HelpDialogContent
import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
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
          Cloud Instance Advisor is a powerful recommendation engine designed to analyze
          historical system statistics and generate tailored cloud instance recommendations.
        </Typography>

        {/* Note */}
        <Typography mt={2}>
          <span>
            To get started, download the MetaCollector package by clicking the <b>"Meta
                                    Collector”</b>
                                button. This will redirect you to the MetaCollector page, where you can download the
                                executable package for both Windows and Linux platforms. The MetaCollector tool captures
                                essential system statistics such as CPU, memory, network, and I/O utilization. For
                                detailed setup and usage instructions, refer to the “MetaCollector User guide”. Click &nbsp;
                                <b>User Guide</b> on the MetaCollector page to download the user guide in PDF format.
                                </span>
                                <p> Once you've collected the system statistics using Meta Collector, upload the generated
                                output files to the EIA portal to receive tailored instance recommendations. You may
                                upload a single .xlsx file containing statistics for multiple systems or use the
                                downloadable excel template to input the required details manually.</p>
        </Typography>
      </Box>
    </Box>
  );
}
AboutDialogContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

