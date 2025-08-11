//  HelpDialogContent
import React from "react";
import { Box, Typography, IconButton, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export default function StatCollectorDescription({ onClose }) {
  return (
    <Box sx={{ p: 0 }} gap={0} color={"primary.main"}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Meta Collector
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box p={2} overflow={"auto"}>
        <Typography>
          To get started, download the MetaCollector package by clicking the <b>"Meta
            Collector”</b>
          button. This will redirect you to the MetaCollector page, where you can download the
          executable package for both Windows and Linux platforms. The MetaCollector tool captures
          essential system statistics such as CPU, memory, network, and I/O utilization. For
          detailed setup and usage instructions, refer to the “MetaCollector User guide”. Click &nbsp;
          <b>User Guide</b> on the MetaCollector page to download the user guide in PDF format.
        </Typography>

        <Box
          display={"flex"}
          gap={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={2}
        >
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            id="btn-download-stat-collector"
            onClick={() => {
              onClose()
              window.open('https://epyc-metacollector.amd.com/')
            }}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Open
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

StatCollectorDescription.propTypes = {
  onClose: PropTypes.func.isRequired,
};
