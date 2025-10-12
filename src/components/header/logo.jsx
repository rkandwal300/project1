import { Box } from "../template/index.js";
import logo from "../../assets/auth/amd_cca.svg"

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
        p:3,
      }}
    >
      <img
        id="header-logo-img"
        src={logo}
        alt="AMD Logo"
        style={{ width: "5.7rem", cursor: "pointer" }}
      />
    </Box>
  );
}

export default Logo;
