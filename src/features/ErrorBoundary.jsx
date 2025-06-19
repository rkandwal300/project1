import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
} from "@mui/material";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", { error, info });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  renderErrorDetails() {
    const { error } = this.state;

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={3}
      >
        <Paper elevation={4} sx={{ p: 4, maxWidth: "700px", width: "100%" }}>
          <Stack spacing={2}>
            <Typography variant="h5" color="error">
              Something went wrong
            </Typography>

            <Divider />

            <Typography variant="subtitle1" fontWeight="bold">
              Error Name
            </Typography>
            <Typography variant="body2">{error?.name || "N/A"}</Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              Message
            </Typography>
            <Typography variant="body2">{error?.message || "N/A"}</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Fallback
            </Typography>
            <Typography variant="body2">{this.props.fallback         || "N/A"}</Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              Stack Trace
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: "#f5f5f5",
                p: 2,
                overflowX: "auto",
                maxHeight: "300px",
                fontSize: "0.75rem",
              }}
            >
              {error?.stack || "No stack trace available"}
            </Box>

            <Button variant="contained" onClick={this.handleReset}>
              Try Again
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorDetails();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
