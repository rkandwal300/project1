import React, { lazy, Suspense, useCallback } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
 
const AddCircleIcon = lazy(() => import("@mui/icons-material/AddCircle"));
 
const resetFormImport = () =>
  import("@/redux/features/form/formData.slice").then((mod) => mod.resetForm);
const toggleHideInstancesImport = () =>
  import("@/redux/features/form/formData.slice").then(
    (mod) => mod.toggleHideInstances
  );

function PortfolioHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetForm = useCallback(async () => {
    const [resetForm, toggleHideInstances] = await Promise.all([
      resetFormImport(),
      toggleHideInstancesImport(),
    ]);
    dispatch(resetForm());
    dispatch(toggleHideInstances(true));
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      fontWeight={500}
      height="2.5rem"
    >
      <Typography sx={{ pl: 1 }}>Portfolios</Typography>
      <Tooltip
        title="Create New Portfolio"
        slotProps={{ tooltip: { sx: { fontSize: "0.8rem" } } }}
      >
        <Suspense fallback={null}>
          <IconButton
            onClick={handleResetForm}
            id="btn-dashboard-createPortfolio"
            aria-label="Create New Portfolio"
            size="small"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <AddCircleIcon fontSize="small" />
          </IconButton>
        </Suspense>
      </Tooltip>
    </Box>
  );
}

export default React.memo(PortfolioHeader);
