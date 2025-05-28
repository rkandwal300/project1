import React from "react";
import { Box, Button, Typography, Grid, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstanceFormData,
  selectInstanceStats,
  selectSelfPrefAssessment,
} from "@/redux/features/instance/instance.selector";
import {
  addInstance,
  deletePortfolioFromList,
} from "@/redux/features/instanceList/instanceList.slice";
import { resetInstanceState } from "@/redux/features/instance/instance.slice";

export default function BottomBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const formData = useSelector(selectInstanceFormData);
  const instances = useSelector(selectInstanceStats);
  const selfPrefAssessmentData = useSelector(selectSelfPrefAssessment);

  const handleSavePortFolio = () => {
    dispatch(
      addInstance({
        instances,
        portfolioName: formData.portfolioName,
        selfPrefAssessment: selfPrefAssessmentData,
      })
    );
    dispatch(resetInstanceState());
  };
  const handleDeletePortfolio = () => {
    if (formData.id) dispatch(deletePortfolioFromList({ id: formData.id }));
  };

  const handleResetFormData = () => {
    dispatch(resetInstanceState());
  };

  const isSaveDisabled = instances.length == 0;
  const isInstanceAdviceDisabled = true;
  const isCancelDisabled = Object.values(formData).every((val) => {
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "string") return val.trim() === "";
    if (typeof val === "number") return val === 0;
    return val === null;
  });
  console.log({ isCancelDisabled, formData });
  return (
    <Box
      id="manage-portfolio-footer-action-container"
      sx={{
        p: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.text.default,
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: 700, fontSize: "0.8rem", display: "inline" }}
      >
        Note:
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontSize: "0.8rem", display: "inline", ml: 0.5 }}
      >
        Please upload file with maximum of 20,000 records
      </Typography>

      {/* Action buttons */}
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
