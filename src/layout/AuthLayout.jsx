import Box from "../components/template/Box.jsx";
import IconButton from "../components/template/IconButton.jsx"; 
import Typography from "../components/template/Typography.jsx";
import { Outlet, useLocation } from "react-router";
import authBackgroud from "../assets/auth/authScreen.mp4";
import { RoutePaths } from "../router/routePaths";
import { PersonIcon } from "../components/template/icons.js";
import { getUser } from "../store/selectors/uiSelector";

const AuthLayout = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname == RoutePaths.HOME ? true : false;
  const userAuth = getUser();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={authBackgroud} type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: isHomeRoute ? "flex" : "none",
          alignItems: "center",
          position: "absolute",
          height: "3rem",
          width: "100dvw",
          bgcolor: "secondary.main",
          color: "primary.contrastText",
          top: "0",
          justifyContent: "end",
          gap: "0.1rem",
          px: 4,
        }}
      >
        <IconButton>
          <PersonIcon sx={{ color: "#fff" }} />
        </IconButton>
        {userAuth && (
          <Typography variant="subtitle1" fontWeight={600}>
            {userAuth?.user.email}
          </Typography>
        )}
      </Box>
      {/* Content Container - Scrollable */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          padding: { xs: 2, sm: 3, md: 4 },
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
