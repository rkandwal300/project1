import {
  AppBar,
  Box,
  Toolbar,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import Logo from "./logo";
import { RoutePaths } from "../../router/routePaths";
import { useLocation, Link as RouterLink } from "react-router";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const iconButtonStyle = {
    width: 24,
    height: 24,
    padding: 0,
    pr: "5px",
    color: "primary.contrastText",
    fontSize: 24,
  };
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      href: RoutePaths.DASHBOARD,
    },
    {
      label: "Portfolio",
      href: RoutePaths.PORTFOLIO,
    },
    {
      label: "Explorer",
      href: RoutePaths.EXPLORER,
    },
    {
      label: "Insights",
      href: RoutePaths.INSIGHTS,
    },
  ];
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "black",
        zIndex: 1006,
        height: "64px",
        justifyContent: { md: "center" },
        boxShadow: 4,
        borderRadius: 0,
        paddingTop: { xs: 2, sm: 0 },
      }}
      id="header-bar-container"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          height: "64px",
          paddingLeft: 2,
          gap: 6,
        }}
      >
        <Logo />
        <Box
          sx={{
            display: "flex",
            gap: 6,
          }}
        >
          {links.map((val) => (
            <MuiLink
              key={val.href}
              component={RouterLink}
              to={val.href}
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                color:
                  val.href === location.pathname
                    ? "primary.contrastText"
                    : "secondary.contrastText",
              }}
            >
              {val.label}
            </MuiLink>
          ))}
        </Box>
        <HeaderMenu />
      
      </Toolbar>
    </AppBar>
  );
}

export default Header;
