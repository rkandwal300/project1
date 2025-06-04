import React from "react";
import { Box, Button, Typography, Grid, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
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
import { nanoid } from "@reduxjs/toolkit";
import {
  addSelfAssessment,
  resetForm,
  toggleHideInstances,
  updateFormData,
  updateResetState,
  uploadInstance,
} from "@/redux/features/form/formData.slice";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import useTimedMessage from "@/hooks/useTimedMessage";
import FormAlert from "../ui/FormAlert";
import { useNavigate } from "react-router-dom";

function BottomBar() {
  const navigate = useNavigate();

  const theme = useTheme();
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const instances = useSelector(selectInstanceStats);
  const selfPrefAssessmentData = useSelector(selectSelfPrefAssessment);

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();
  const formId = formData.id || nanoid();
  const handleSavePortFolio = () => {
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
  };

  const handleDeletePortfolio = () => {
    dispatch(deletePortfolioFromList({ id: formData.id }));
    dispatch(resetForm());
    dispatch(toggleHideInstances(true));

    setFormSuccess(`${formData.portfolioName} Deleted successfully`);
  };

  const handleResetFormData = () => {
    dispatch(resetForm());
  };

  const isSaveDisabled = !instances.length || !formData.portfolioName.trim();

  const isInstanceAdviceDisabled = !formData.id;
  const isValueEmpty = (val) => {
    if (Array.isArray(val)) {
      return !val.length;
    }
    if (typeof val === "string") {
      return !val.trim();
    }
    if (typeof val === "number") {
      return !val;
    }
    return val == null;
  };

  const isCancelDisabled = Object.values(formData).every(isValueEmpty);

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
        <Button
          variant="contained"
          color="error"
          startIcon={<CloseIcon />}
          disabled={isCancelDisabled}
          onClick={handleResetFormData}
        >
          Cancel
        </Button>

        {formData.id && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeletePortfolio}
          >
            Delete portfolio
          </Button>
        )}

        <Button
          onClick={handleSavePortFolio}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={isSaveDisabled}
        >
          Save
        </Button>

        <Button
          variant="contained"
          startIcon={<BuildIcon />}
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
  );
}

const BottomBarWithBoundary = withErrorBoundary(
  BottomBar,
  "Bottom bar component has some Errors"
);
export default BottomBarWithBoundary;
