import React, { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectHideInstances } from "@/redux/features/form/formData.selector";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";

// Dynamic imports for code splitting
const Sidebar = lazy(() => import("@/components/shared/Sidebar/Sidebar"));
const InstanceForm = lazy(() => import("@/components/shared/Form/InstanceForm"));
const PortfolioBody = lazy(() => import("../PortfolioBody"));

function MainContent() {
  const showTable = useSelector(selectHideInstances);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "flex-start",
        mt: 8,
        p: 0,
      }}
    >
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>
      <Box sx={{ flex: 1, p: 0, overflowY: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            boxShadow: 3,
          }}
        >
          <Suspense fallback={null}>
            <InstanceForm />
          </Suspense>
          {!showTable && (
            <Suspense fallback={null}>
              <PortfolioBody />
            </Suspense>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const MainContentWithErrorBoundary = withErrorBoundary(
  MainContent,
  "MainContent component has some Errors"
);

export default MainContentWithErrorBoundary;
