import React from "react";
import { Box, Button, Typography, Grid, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import BuildIcon from "@mui/icons-material/Build";

export default function BottomBar() {
  const theme = useTheme();
  
  return (
    <Box
      id="manage-portfolio-footer-action-container"
      sx={{
        p: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.text.default,
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: 700, fontSize: "0.8rem", display: "inline" }}
      >
        Note:
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontSize: "0.8rem", display: "inline", ml: 0.5 }}
      >
        Please upload file with maximum of 20,000 records
      </Typography>

      {/* Action buttons */}
      <Grid container spacing={1} justifyContent="flex-end" alignItems="center">
        <Grid item>
          <Button variant="contained" color="error" startIcon={<CloseIcon />}>
            Cancel
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.default,
              color: theme.palette.error.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.default,
              },
            }}
          >
            Save
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            startIcon={<BuildIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.default,
              color: theme.palette.error.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.default,
              },
            }}
          >
            Instance advice
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
