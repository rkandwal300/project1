import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Typography } from "@mui/material";

function CorrectionAndGuideLines({ handleClose }) {
  return (
    <Box p={0} gap={0} width="full" color="primary.main">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="10px 24px"
      >
        <Typography variant="h6" fontWeight="bold" fontSize={18} gutterBottom>
          How data corrections are applied:
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box p="24px">
        <Typography fontSize={16} fontWeight={600}>
          Cloud Selection:
        </Typography>
        <Typography fontSize={16} mt={0.5} ml={2}>
          If the cloud value is empty, invalid, or unsupported, it will be
          automatically set to the default Cloud Service Provider (CSP).
        </Typography>
      </Box>
    </Box>
  );
}
CorrectionAndGuideLines.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CorrectionAndGuideLines;
