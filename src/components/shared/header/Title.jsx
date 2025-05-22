import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

function Title() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        ml: { xl: 10, sm: 2.5 },
        mr: { xs: "auto", md: 2 },
        flexGrow: 1,
        width: { xs: 80, lg: "60%" },
      }}
    >
      <Typography
        id="header-heading-txt"
        sx={{
          flexGrow: 1,
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "white",
          overflow: "hidden",
          textAlign: "center",
          textOverflow: "ellipsis",
          whiteSpace: { xs: "nowrap", sm: "wrap" },
          width: "100%",
        }}
      >
        {isSm ? "Cloud Instance Advisor" : "  AMD EPYC Cloud Instance Advisor"}
      </Typography>
    </Box>
  );
}

export default Title;
