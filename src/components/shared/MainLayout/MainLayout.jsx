import React, { Suspense, lazy } from "react";
import { Box } from "@mui/material";
 
const Header = lazy(() => import("@/components/shared/header/Header"));
const Footer = lazy(() => import("@/components/shared/Footer/Footer/Footer"));
const BottomBar = lazy(() => import("@/components/shared/BottomBar"));
const MainContent = lazy(() => import("./MainContent"));

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Box display="flex" minHeight="100vh" flexDirection="column">
        <Suspense fallback={null}>
          <MainContent />
        </Suspense>
        <Suspense fallback={null}>
          <BottomBar />
        </Suspense>
      </Box>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </Box>
  );
}

export default React.memo(MainLayout);
