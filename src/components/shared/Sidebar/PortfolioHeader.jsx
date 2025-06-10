import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux"; 

import { useNavigate } from "react-router-dom";
import { addCurrentInstance } from "@/redux/features/instanceList/instanceList.slice";
import { resetInstanceState } from "@/redux/features/instance/instance.slice";

function PortfolioHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleResetForm = () => {
    dispatch(addCurrentInstance(null));
    dispatch(resetInstanceState());
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
          id="btn-dashboard-createPortfolio"
          aria-label="Create New Portfolio"
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
