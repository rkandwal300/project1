import { useTheme } from "@emotion/react";
import { Box, Button } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/lib/router";

function InstanceAdviceBottomBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const route =
    location.pathname == "cca-costAdvisory" ? "/" : ROUTES.ROOT;
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.grey[100],
        color: theme.palette.text.default,
      }}
    >
      <Button
        id={"close-instance-advice"}
        variant="contained"
        color="error"
        startIcon={<CloseIcon />}
        onClick={() => navigate(ROUTES.ROOt)}
      >
        Close
      </Button>
    </Box>
  );
}

export default InstanceAdviceBottomBar;
