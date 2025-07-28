import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { Box, Button, Typography, useTheme, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";

// Dynamic imports for icons and components
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));
const SaveIcon = React.lazy(() => import("@mui/icons-material/Save"));
const BuildIcon = React.lazy(() => import("@mui/icons-material/Build"));
const DeleteIcon = React.lazy(() => import("@mui/icons-material/Delete"));
const DialogHoc = lazy(() => import("../ui/Dialog"));
const FormAlert = lazy(() => import("../ui/FormAlert"));

// Redux actions and selectors
import {
  addCurrentInstance,
  addInstance,
  deletePortfolioFromList,
  updateInstance,
} from "@/redux/features/instanceList/instanceList.slice";
import {
  selectInstances,
  selectMessage,
  selectMessageType,
  selectPortfolioName,
  selectSelfAssessment,
} from "@/redux/features/instance/instance.selector";
import {
  errorMessageType,
  resetInstanceState,
  setMessage,
  updateInstanceState,
} from "@/redux/features/instance/instance.slice";
import { selectInstanceList } from "@/redux/features/instanceList/instanceList.selector";
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";
import { CCA_LINKS } from "./header/CCATitle";
import { AttachMoney } from "@mui/icons-material";

function BottomBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const currentInstanceId = location.pathname.split("/")[1];

  const currentProviderName = useSelector(selectCurrentProviderName);
  const alertMessage = useSelector(selectMessage);
  const alertMessageType = useSelector(selectMessageType);
  const portfolioName = useSelector(selectPortfolioName);
  const instances = useSelector(selectInstances);
  const instanceList = useSelector(selectInstanceList);
  const selfPrefAssessmentData = useSelector(selectSelfAssessment);

  const formId = currentInstanceId || nanoid();

  const handleSavePortFolio = () => {
    const trimmedName = portfolioName?.trim();
    if (!trimmedName) {
      dispatch(
        setMessage({
          type: errorMessageType.ERROR,
          message:
            "Please enter a portfolio name with at least 3 characters. Only letters, numbers, underscores (_), and hyphens (-) are allowed; no other special characters.",
        })
      );
      return;
    }

    const isDuplicate = instanceList.some(
      (instance) =>
        instance.name === trimmedName &&
        instance.provider === currentProviderName
    );

    if (isDuplicate) {
      dispatch(
        setMessage({
          type: errorMessageType.ERROR,
          message: "Portfolio name already exists",
        })
      );
      return;
    }

    const payload = {
      id: formId,
      instances,
      type: "cloud",
      provider: currentProviderName,
      name: trimmedName,
      selfPrefAssessment: selfPrefAssessmentData,
    };
    const isValidRoute = Object.values(CCA_LINKS).some((path) =>
      matchPath({ path, end: false }, `/${currentInstanceId}`)
    ); 
    if (currentInstanceId && !isValidRoute) {
      dispatch(updateInstance(payload));
    } else {
      dispatch(addInstance(payload));
    }

    navigate(`/${CCA_LINKS.EXPLORER}/${formId}`);
    dispatch(
      setMessage({
        type: errorMessageType.SUCCESS,
        message: `${trimmedName} saved successfully`,
      })
    );
  };

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

  const handleResetFormData = useCallback(() => {
    dispatch(
      updateInstanceState({
        name: portfolioName,
        selfAssessment: selfPrefAssessmentData,
        instances,
      })
    );
    dispatch(addCurrentInstance(null));
    navigate("/");
  }, [dispatch, portfolioName, selfPrefAssessmentData, instances, navigate]);

  const isSaveDisabled = !instances.length;
  const isCancelDisabled = !instances.length;
  const isInstanceAdviceDisabled = !currentInstanceId;

  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        dispatch(
          setMessage({
            message: "",
            type: null,
          })
        );
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alertMessage, dispatch]);

  return (
    <Box
      display="grid"
      gap={"16px"}
      sx={{
        p: 2,
        maxHeight: "400px",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.grey[100],
        color: theme.palette.text.default,
        height: "auto",
        minHeight: "unset",
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
        display={"flex"}
        gap="16px"
        flexWrap={"wrap"}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Suspense fallback={null}>
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            disabled={isCancelDisabled}
            onClick={handleResetFormData}
          >
            Cancel
          </Button>
        </Suspense>

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
                <Box display={"flex"} flexDirection={"column"} gap="0px">
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
                      color: "secondary.default",
                    }}
                    gutterBottom
                  >
                    Are you sure you want to delete this portfolio.
                  </Typography>
                  <Box
                    onClick={handleClose}
                    display={"flex"}
                    padding={"10px"}
                    gap="10px"
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
                      id={"confirmDeletePortfolio"}
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
        <Suspense fallback={null}>
          <Button
            id="savePortfolio"
            onClick={handleSavePortFolio}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </Suspense>
        <Suspense fallback={null}>
          <Button
            id={"instanceAdvice"}
            variant="contained"
            startIcon={
              location.pathname == CCA_LINKS.MANAGE_PORTFOLIO ||
              matchPath(
                { path: CCA_LINKS.CLOUD_USAGE_REPORT_DETAILS, end: true },
                location.pathname // or a hardcoded string like "/cloudInstances/abc123"
              ) ? (
                <AttachMoney />
              ) : (
                <BuildIcon />
              )
            }
            disabled={isInstanceAdviceDisabled}
            onClick={() =>
              location.pathname == CCA_LINKS.MANAGE_PORTFOLIO ||
              matchPath(
                { path: CCA_LINKS.CLOUD_USAGE_REPORT_DETAILS, end: true },
                location.pathname // or a hardcoded string like "/cloudInstances/abc123"
              )
                ? navigate(CCA_LINKS.COST_ADVISORY)
                : navigate("/instanceAdvice")
            }
          >
            {location.pathname == CCA_LINKS.MANAGE_PORTFOLIO ||
            matchPath(
              { path: CCA_LINKS.CLOUD_USAGE_REPORT_DETAILS, end: true },
              location.pathname // or a hardcoded string like "/cloudInstances/abc123"
            )
              ? "Cost advice"
              : "Instance advice"}
          </Button>
        </Suspense>
      </Box>
      <Suspense fallback={null}>
        <FormAlert
          open={Boolean(alertMessageType)}
          severity={alertMessageType}
          onClose={() =>
            dispatch(
              setMessage({
                message: "",
                type: null,
              })
            )
          }
        >
          {alertMessage}
        </FormAlert>
      </Suspense>
    </Box>
  );
}

const BottomBarWithBoundary = withErrorBoundary(
  BottomBar,
  "Bottom bar component has some Errors"
);
export default BottomBarWithBoundary;
