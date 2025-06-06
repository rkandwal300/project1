import React, { Suspense, lazy } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
 
const SubMenuList = lazy(() => import("./SubMenuList"));
const ResponsiveSubMenu = lazy(() => import("./ResponsiveSubmenu"));

export default function SubMenu() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Suspense fallback={null}>
      {isMobile ? <ResponsiveSubMenu /> : <SubMenuList />}
    </Suspense>
  );
}
