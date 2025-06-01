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
import { resetForm } from "@/redux/features/form/formData.slice";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";

function BottomBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const instances = useSelector(selectInstanceStats);
  const selfPrefAssessmentData = useSelector(selectSelfPrefAssessment);

  const handleSavePortFolio = () => {
    const payload = {
      id: formData.id || nanoid(),
      instances,
      portfolioName: formData.portfolioName,
      selfPrefAssessment: selfPrefAssessmentData,
    };
    dispatch(formData.id ? updateInstance(payload) : addInstance(payload));
    dispatch(resetForm());
  };

  const handleDeletePortfolio = () => {
    dispatch(deletePortfolioFromList({ id: formData.id }));
    dispatch(resetForm());
  };

  const handleResetFormData = () => {
    dispatch(resetForm());
  };

  const isSaveDisabled = !instances.length || !formData.portfolioName.trim();

  const isInstanceAdviceDisabled = true;
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
      id="manage-portfolio-footer-action-container"
      display="grid"
      gap={"16px"}
      sx={{
        p: 2,
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.grey[100],
        color: theme.palette.text.default,
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
      <Grid container spacing={1} justifyContent="flex-end" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            disabled={isCancelDisabled}
            onClick={handleResetFormData}
          >
            Cancel
          </Button>
        </Grid>
        {formData.id && (
          <Grid item>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeletePortfolio}
            >
              Delete portfolio
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            onClick={handleSavePortFolio}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<BuildIcon />}
            disabled={isInstanceAdviceDisabled}
          >
            Instance advice
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

const BottomBarWithBoundary = withErrorBoundary(
  BottomBar,
  "Bottom bar component has some Errors"
);
export default BottomBarWithBoundary;
