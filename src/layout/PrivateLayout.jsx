import { Outlet } from "react-router";
import Header from "../components/header/header";
import Box from '../components/template/Box'
import Typography from '../components/template/Typography'

const PrivateLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        paddingTop: "64px",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          fontSize: "14px",
          justifyContent: "space-between",
          bgcolor: "secondary.main",
          width: "100%",
          paddingX: "26px",
          paddingY: "10px",
        }}
      >
        <Typography sx={{ color: "primary.main" }}>Dasboard</Typography>
        <Typography sx={{ color: "text.primary", fontWeight: 700 }}>
          EPYC Cloud Cost Advisor
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
};

export default PrivateLayout;
