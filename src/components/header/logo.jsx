import { Box } from "@mui/material";
import logo from "../../assets/auth/amdLogo.png";

function Logo() {
  return (
    <Box
      component={"button"}
      id="redirectToHome"
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "transparent",
        border: "none",
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
