import { Box } from "@mui/material";
import React from "react";
import logo from "@/assets/logos/amd-header-logo.svg";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <Box
      component={"button"}
      id="redirectToHome"
      onClick={() => navigate("/")}
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor:'transparent',
        border:'none'
      }}
    >
      <img
        id="header-logo-img"
        src={logo}
        alt="AMD Logo"
        style={{ width: "80px", cursor: "pointer" }}
      />
    </Box>
  );
}

export default Logo;
