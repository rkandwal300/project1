import React, { Suspense, lazy, memo } from "react";
import { Box, Skeleton } from "@mui/material";

const Header = lazy(() => import("@/components/shared/header/Header"));
const Footer = lazy(() => import("@/components/shared/Footer/Footer/Footer"));
const BottomBar = lazy(() => import("@/components/shared/BottomBar"));
const MainContent = lazy(() => import("./MainContent"));

const withSuspense = (Children) => {
  return function SuspendedComponent(props) {
    if (!Children) {
      return <Skeleton variant="rectangular" width="100%" height="100%" />;
    }
 
    return (
      <Suspense fallback={null}>
        <Children {...props} />
      </Suspense>
    );
  };
};

const SuspendedHeader = withSuspense(Header);
const SuspendedFooter = withSuspense(Footer);
const SuspendedBottomBar = withSuspense(BottomBar);
const SuspendedMainContent = withSuspense(MainContent);

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SuspendedHeader />
      <Box display="flex" minHeight="100vh" flexDirection="column">
        <SuspendedMainContent />
        <SuspendedBottomBar />
      </Box>
      <SuspendedFooter />
    </Box>
  );
}

export default memo(MainLayout);
