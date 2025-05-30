import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { resetFormData } from "@/redux/features/instance/instance.slice";

function PortfolioHeader() {
  const dispatch = useDispatch();
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
        onClick={dispatch(resetFormData())}
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
