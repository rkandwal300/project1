import React, { Suspense, lazy } from "react";
import { AppBar, Toolbar, useTheme } from "@mui/material";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import { Link } from "react-router-dom";

// Lazy load components
const SubMenu = lazy(() => import("./SubMenu/SubMenu"));
const Logo = lazy(() => import("./Logo"));
const Title = lazy(() => import("./Title"));

function Header() {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.dark,
        zIndex: 1006,
        height: 64,
        justifyContent: { md: "center" },
        boxShadow: 4,
        borderRadius: 0,
        paddingTop: { xs: 2, sm: 0 },
      }}
      id="header-bar-container"
    >
      <Toolbar
        sx={{
          height: 64,
          paddingLeft: 2,
          gap: { md: 2, xs: 2 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Suspense fallback={null}>
          <Link to="/">
            <Logo />
          </Link>
        </Suspense>
        <Suspense fallback={null}>
          <Title />
        </Suspense>
        <Suspense fallback={null}>
          <SubMenu />
        </Suspense>
      </Toolbar>
    </AppBar>
  );
}

export default withErrorBoundary(
  React.memo(Header),
  "Header component has some Errors"
);
