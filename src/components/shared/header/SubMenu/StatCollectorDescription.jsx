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
          Stat Collector
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box p={2} overflow={"auto"}>
        <Typography mt={2}>
          This stat collector generates a single excel file containing data for
          one or multiple instances providing users with insights into instance
          type, zone, CPU, memory, disk IOPS, bandwidth, and network bandwidth
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
            onClick={onClose}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Download
            </Button>
        </Box>
      </Box>
    </Box>
  );
}

StatCollectorDescription.propTypes = {
  onClose: PropTypes.func.isRequired,
};
