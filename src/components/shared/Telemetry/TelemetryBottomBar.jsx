import React from "react";
import { Box, Grid, Button,  } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TelemetryBottomBar = () => {
  return (
    <Box
      id="manage-portfolio-footer-action-container"
      className="action-footer"
      sx={{ p: 1 }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        wrap="nowrap"
      >
        <Grid item>
          <Button
            variant="contained"
            disabled
            color="error"
            id="btn-cinstancelist-cancel"
            startIcon={<CloseIcon />}
            sx={{ textTransform: "none", mr: 1 }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
            
              mr: 1,
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Fetch/ Sync Instances
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              mt: "4px",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Save Metrics
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TelemetryBottomBar;
