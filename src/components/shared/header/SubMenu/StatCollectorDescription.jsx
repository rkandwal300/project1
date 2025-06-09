import React, { Suspense, lazy, memo } from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton, Divider, Button, CircularProgress } from "@mui/material";
 
const CloseIcon = lazy(() => import("@mui/icons-material/Close"));

const StatCollectorDescription = memo(function StatCollectorDescription({ onClose }) {
  return (
    <Box sx={{ p: 0 }} gap={0} color="primary.main">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Stat Collector
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Suspense fallback={<CircularProgress size={24} />}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Suspense>
        </Box>
      </Box>
      <Divider />
      <Box p={2} overflow="auto">
        <Typography mt={2}>
          This stat collector generates a single excel file containing data for
          one or multiple instances providing users with insights into instance
          type, zone, CPU, memory, disk IOPS, bandwidth, and network bandwidth
        </Typography>
        <Box
          display="flex"
          gap={2}
          justifyContent="center"
          alignItems="center"
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
});

StatCollectorDescription.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default StatCollectorDescription;
