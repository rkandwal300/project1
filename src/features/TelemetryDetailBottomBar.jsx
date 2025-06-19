import React, { useEffect, useCallback, lazy, Suspense, useMemo } from "react";
import { Box, Button, Typography, useTheme, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate, useLocation } from "react-router-dom";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import EditIcon from "@mui/icons-material/Edit";

const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
const BuildIcon = lazy(() => import("@mui/icons-material/Build"));
const DialogHoc = lazy(() => import("@/components/Dialog"));
const FormAlert = lazy(() => import("@/components/FormAlert"));

import { deletePortfolioFromList } from "@/redux/features/instanceList/instanceList.slice";
import {
  selectMessage,
  selectMessageType,
  selectPortfolioName,
} from "@/redux/features/instance/instance.selector";
import {
  errorMessageType,
  resetInstanceState,
  setMessage,
} from "@/redux/features/instance/instance.slice";
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";
import { selectCurrentInstance } from "@/redux/features/instanceList/instanceList.selector";
import { getProviderConfig } from "@/lib/utils";

function TelemetryDetailBottomBarComponent() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentInstance = useSelector(selectCurrentInstance);
  const currentProviderName = useSelector(selectCurrentProviderName);
  const alertMessage = useSelector(selectMessage);
  const alertMessageType = useSelector(selectMessageType);
  const portfolioName = useSelector(selectPortfolioName);

  const routes = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  );
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const type = searchParams.get("type") || "";

  // Redirect if no current instance
  useEffect(() => {
    if (!currentInstance) {
      const provider = getProviderConfig(routes, type);
      navigate(`/${provider.type}?type=${currentProviderName}`, { replace: true });
    }
  }, [currentInstance, routes, type, navigate, currentProviderName]);

  // Auto-clear alert message
  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        dispatch(setMessage({ message: "", type: null }));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alertMessage, dispatch]);

  const currentInstanceId = currentInstance?.id;
  const formId = currentInstanceId || nanoid();

  const handleDeletePortfolio = useCallback(() => {
    dispatch(deletePortfolioFromList({ id: formId }));
    dispatch(resetInstanceState());
    dispatch(
      setMessage({
        type: errorMessageType.SUCCESS,
        message: `${portfolioName} deleted successfully`,
      })
    );
    navigate("/");
  }, [dispatch, formId, portfolioName, navigate]);

  return (
    <Box
      display="grid"
      gap={2}
      sx={{
        p: 2,
        maxHeight: 400,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.grey[100],
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 400,
          fontSize: "0.8rem",
          display: "flex",
          alignItems: "start",
          gap: 0.5,
        }}
      >
        <span style={{ fontWeight: 700 }}>Note:</span>
        <span> Please upload file with maximum of 20,000 records</span>
      </Typography>
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        justifyContent="flex-end"
        alignItems="center"
      >
        {currentInstanceId && (
          <Suspense fallback={null}>
            <DialogHoc
              maxWidth="xs"
              trigger={({ onClick }) => (
                <Button
                  id="deletePortfolio"
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={onClick}
                >
                  Delete portfolio
                </Button>
              )}
              content={({ handleClose }) => (
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5" sx={{ m: 2 }} gutterBottom>
                    Confirm Delete Portfolio?
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body2"
                    sx={{
                      my: 1,
                      mx: 2,
                      fontWeight: 600,
                      color: "secondary.main",
                    }}
                    gutterBottom
                  >
                    Are you sure you want to delete this portfolio.
                  </Typography>
                  <Box
                    display="flex"
                    padding={1}
                    gap={1}
                    justifyContent="flex-end"
                  >
                    <Button
                      id="cancelDeletePortfolio"
                      variant="outlined"
                      color="primary"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      id="confirmDeletePortfolio"
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        handleDeletePortfolio();
                        handleClose();
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              )}
            />
          </Suspense>
        )}
        <Button
          id="savePortfolio"
          onClick={() =>
            navigate(
              `/telemetry/?edit=${currentInstanceId}&type=${currentProviderName}`
            )
          }
          variant="contained"
          startIcon={<EditIcon />}
        >
          Update Credentials
        </Button>
        <Suspense fallback={null}>
          <Button
            id="instanceAdvice"
            variant="contained"
            startIcon={<BuildIcon />}
            onClick={() => navigate("/instanceAdvice")}
          >
            Instance advice
          </Button>
        </Suspense>
      </Box>
      <Suspense fallback={null}>
        <FormAlert
          open={Boolean(alertMessageType)}
          severity={alertMessageType}
          onClose={() => dispatch(setMessage({ message: "", type: null }))}
        >
          {alertMessage}
        </FormAlert>
      </Suspense>
    </Box>
  );
}

export default withErrorBoundary(
  TelemetryDetailBottomBarComponent,
  "Bottom bar component has some Errors"
);
