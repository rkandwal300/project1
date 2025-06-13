import React from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function DataDogTelemetry() {
  return (
    <Box sx={{ backgroundColor: "white", p: 2, width: "100%" }}>
      <Box
        container
        alignItems="center"
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(7, 1fr)" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          label="Portfolio Name"
          variant="outlined"
          fullWidth
          required
          sx={{ gridColumn: "span 3" }}
          InputProps={{
            style: { fontWeight: 600 },
          }}
        />

        <TextField
          label="Regions"
          variant="outlined"
          fullWidth
          required
          sx={{ gridColumn: "span 3" }}
          InputProps={{
            startAdornment: <Chip label="af-south-1" sx={{ mr: 0.5 }} />,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        container
        alignItems="center"
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(7, 1fr)" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          label="API key"
          type="password"
          variant="outlined"
          fullWidth
          required
          defaultValue=""
          sx={{ gridColumn: "span 2" }}
          InputProps={{
            style: { fontWeight: 600 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <VisibilityOffIcon sx={{ color: "black", fontSize: 19 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Application Key"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ gridColumn: "span 2" }}
          InputProps={{
            style: { fontWeight: 600 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <VisibilityOffIcon sx={{ color: "black", fontSize: 19 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Host Tag"
          type="text"
          variant="outlined"
          sx={{ gridColumn: "span 2" }}
          fullWidth
          required
          InputProps={{
            style: { fontWeight: 600 },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ gridColumn: "span 1", textTransform: "none" }}
          disabled
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Test Connection
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default DataDogTelemetry;
