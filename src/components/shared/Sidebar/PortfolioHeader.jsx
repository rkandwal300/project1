import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle"; 
import { useDispatch } from "react-redux";
import { resetForm, toggleHideInstances } from "@/redux/features/form/formData.slice";

import { useNavigate } from "react-router-dom";

function PortfolioHeader() { 
  const  navigate = useNavigate();
  const dispatch = useDispatch();
  const handleResetForm = () => {
    dispatch(resetForm());
    dispatch(toggleHideInstances(true));
     navigate("/");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      fontWeight={500}
      height="2.5rem"
    >
      <Typography sx={{ pl: 1 }}>Portfolios</Typography>
      <Tooltip
        title="Create New Portfolio"
        slotProps={{ tooltip: { sx: { fontSize: "0.8rem" } } }}
      >
        <IconButton
        onClick={handleResetForm}
          size="small"
          sx={{
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <AddCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PortfolioHeader;
