import React, { lazy, Suspense, useCallback, useMemo } from "react";
import { Box, Button, Typography, useTheme, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import useTimedMessage from "@/hooks/useTimedMessage";
  
import {
  addInstance,
  deletePortfolioFromList,
  updateInstance,
} from "@/redux/features/instanceList/instanceList.slice";
import {
  selectFormData,
  selectInstanceStats,
  selectSelfPrefAssessment,
} from "@/redux/features/form/formData.selector";
import {
  addSelfAssessment,
  resetForm,
  toggleHideInstances,
  updateFormData,
  updateResetState,
  uploadInstance,
} from "@/redux/features/form/formData.slice";

const CloseIcon = lazy(() => import("@mui/icons-material/Close"));
const SaveIcon = lazy(() => import("@mui/icons-material/Save"));
const BuildIcon = lazy(() => import("@mui/icons-material/Build"));
const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
const DialogHoc = lazy(() => import("../ui/Dialog"));
const FormAlert = lazy(() => import("../ui/FormAlert"));


function BottomBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const formData = useSelector(selectFormData);
  const instances = useSelector(selectInstanceStats);
  const selfPrefAssessmentData = useSelector(selectSelfPrefAssessment);

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();
  const formId = useMemo(() => formData.id || nanoid(), [formData.id]);

  const isValueEmpty = useCallback((val) => {
    if (Array.isArray(val)) return !val.length;
    if (typeof val === "string") return !val.trim();
    if (typeof val === "number") return !val;
    return val == null;
  }, []);

  const isSaveDisabled = !instances.length || !formData.portfolioName.trim();
  const isInstanceAdviceDisabled = !formData.id;
  const isCancelDisabled = useMemo(
    () => Object.values(formData).every(isValueEmpty),
    [formData, isValueEmpty]
  );

  const handleSavePortFolio = useCallback(() => {
    const payload = {
      id: formId,
      instances,
      portfolioName: formData.portfolioName,
      selfPrefAssessment: selfPrefAssessmentData,
    };
    dispatch(formData.id ? updateInstance(payload) : addInstance(payload));
    dispatch(resetForm());
    setFormSuccess(`${formData.portfolioName} saved successfully`);

    dispatch(resetForm(false));
    dispatch(uploadInstance(instances));
    if (selfPrefAssessmentData.length > 0)
      dispatch(addSelfAssessment(selfPrefAssessmentData));
    dispatch(
      updateFormData({
        id: formId,
        portfolioName: formData.portfolioName,
      })
    );
    dispatch(updateResetState(true));
  }, [
    dispatch,
    formData,
    formId,
    instances,
    selfPrefAssessmentData,
    setFormSuccess,
  ]);

  const handleDeletePortfolio = useCallback(() => {
    dispatch(deletePortfolioFromList({ id: formData.id }));
    dispatch(resetForm());
    dispatch(toggleHideInstances(true));
    setFormSuccess(`${formData.portfolioName} Deleted successfully`);
  }, [dispatch, formData.id, formData.portfolioName, setFormSuccess]);

  const handleResetFormData = useCallback(() => {
    dispatch(resetForm());
  }, [dispatch]);

  return (
    <Suspense fallback={null}>
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
          <Button
            variant="contained"
            color="error"
            startIcon={
              <Suspense fallback={null}>
                <CloseIcon />
              </Suspense>
            }
            disabled={isCancelDisabled}
            onClick={handleResetFormData}
          >
            Cancel
          </Button>
          {formData.id && (
            <DialogHoc
              maxWidth="xs"
              trigger={({ onClick }) => (
                <Button
                  id="deletePortfolio"
                  variant="contained"
                  color="error"
                  startIcon={
                    <Suspense fallback={null}>
                      <DeleteIcon />
                    </Suspense>
                  }
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
                      startIcon={
                        <Suspense fallback={null}>
                          <DeleteIcon />
                        </Suspense>
                      }
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
          )}
          <Button
            id="savePortfolio"
            onClick={handleSavePortFolio}
            variant="contained"
            startIcon={
              <Suspense fallback={null}>
                <SaveIcon />
              </Suspense>
            }
            disabled={isSaveDisabled}
          >
            Save
          </Button>
          <Button
            id={"instanceAdvice"}
            variant="contained"
            startIcon={
              <Suspense fallback={null}>
                <BuildIcon />
              </Suspense>
            }
            disabled={isInstanceAdviceDisabled}
            onClick={() => navigate("/instanceAdvice")}
          >
            Instance advice
          </Button>
        </Box>
        <FormAlert
          open={!!formError}
          severity="error"
          onClose={() => setFormError("")}
        >
          {formError}
        </FormAlert>
        <FormAlert
          open={!!formSuccess}
          severity="success"
          onClose={() => setFormSuccess("")}
        >
          {formSuccess}
        </FormAlert>
      </Box>
    </Suspense>
  );
}

const BottomBarWithBoundary = withErrorBoundary(
  BottomBar,
  "Bottom bar component has some Errors"
);
export default BottomBarWithBoundary;
