import { ROUTES } from "@/lib/router";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

function CCATitle() {
  const location = useLocation();
  const url = location.pathname;
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const data = [
    { label: "Manage Portfolio", path: ROUTES.ROOT },
    { label: "Explorer", path: ROUTES.EXPLORER },
  ];

  const styles = (isActive) => ({
    color: "white",
    fontSize: "16px",
    ml: 2.5,
    borderBottom: isActive ? "2px solid white" : "2px solid transparent",
    paddingBottom: "2px",
    transition: "border-bottom 0.3s",
    cursor: "pointer",
    "&:hover": {
      borderBottom: "2px solid white",
    },
  });

  return (
    <Box
      sx={{
        ml: { xl: 10, sm: 2.5 },
        mr: { xs: "auto", md: 2 },
        flexGrow: 1,
        width: { xs: 80, lg: "60%" },
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <Typography
        id="header-heading-txt"
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "white",
          overflow: "hidden",
          textAlign: "center",
          textOverflow: "ellipsis",
          whiteSpace: { xs: "nowrap", sm: "wrap" },
        }}
      >
        {isSm ? "Cloud Cost Advisor" : "EPYC Cloud Cost Advisor"}
      </Typography>

      <Box sx={{ display: "flex", ml: 3 }}>
        {data.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            <Box sx={styles(url === item.path)}>{item.label}</Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default CCATitle;
