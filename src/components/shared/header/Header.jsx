import React, { Suspense, lazy, useMemo } from "react";
import { AppBar, Toolbar, useTheme } from "@mui/material";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import { Link } from "react-router-dom";

const SubMenu = lazy(() => import("./SubMenu/SubMenu"));
const Logo = lazy(() => import("./Logo"));
const Title = lazy(() => import("./Title"));

function Header() {
  const theme = useTheme();
 
  const appBarSx = useMemo(
    () => ({
      backgroundColor: theme.palette.dark,
      zIndex: 1006,
      height: 64,
      justifyContent: { md: "center" },
      boxShadow: 4,
      borderRadius: 0,
      paddingTop: { xs: 2, sm: 0 },
    }),
    [theme.palette.dark]
  );

  const toolbarSx = useMemo(
    () => ({
      height: 64,
      paddingLeft: 2,
      gap: { md: 2, xs: 2 },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
    []
  );

  return (
    <AppBar position="fixed" sx={appBarSx} id="header-bar-container">
      <Toolbar sx={toolbarSx}>
        <Suspense fallback={null}>
          <Link to="/" tabIndex={-1} aria-label="Home">
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

// eslint-disable-next-line react-refresh/only-export-components
export default withErrorBoundary(
  React.memo(Header),
  "Header component has some Errors"
);
