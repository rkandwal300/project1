import React from "react";
import { Box, CircularProgress, Fade } from "../template/index.js";

const LoadingPage = () => (
  <Fade in timeout={700}>
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CircularProgress size={56} color="primary" />
    </Box>
  </Fade>
);

export default LoadingPage;
