import React ,{ useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  useTheme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentInstance,
  addInstance,
  deletePortfolioFromList,
  updateInstance,
} from "@/redux/features/instanceList/instanceList.slice";
import { nanoid } from "@reduxjs/toolkit";
import { withErrorBoundary } from "@/hooks/withErrorBoundary";
import FormAlert from "../ui/FormAlert";
import { useNavigate,useLocation } from "react-router-dom";
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
import DialogHoc from "../ui/Dialog";
import { selectInstanceList } from "@/redux/features/instanceList/instanceList.selector";

function BottomBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentInstanceId = useLocation().pathname.split("/")[1];
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
          message: "Portfolio name is required",
        })
      );
      return;
    }

    const isDuplicate = instanceList.some(
      (instance) =>
        instance.name === trimmedName && instance.id !== currentInstanceId
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
      name: trimmedName,
      selfPrefAssessment: selfPrefAssessmentData,
    };
    if (currentInstanceId) {
      dispatch(updateInstance(payload));
    } else {
      dispatch(addInstance(payload));
    }

    dispatch(resetInstanceState());
    dispatch(addCurrentInstance(formId));
    dispatch(
      setMessage({
        type: errorMessageType.SUCCESS,
        message: `${trimmedName} saved successfully`,
      })
    ); 
    navigate(`/${formId}`);
  };

  const handleDeletePortfolio = () => {
    dispatch(deletePortfolioFromList({ id: formId }));
    dispatch(resetInstanceState());
    dispatch(
      setMessage({
        type: errorMessageType.SUCCESS,
        message: `${portfolioName} saved successfully`,
      })
    );
    navigate("/");
  };

  const handleResetFormData = () => {
    dispatch(
      updateInstanceState({
        name: portfolioName,
        selfAssessment: selfPrefAssessmentData,
        instances,
      })
    );
    dispatch(addCurrentInstance(null));
    
    navigate("/");
  };

  const isSaveDisabled = !instances.length > 0;

  const isCancelDisabled = !instances.length > 0;
  const isInstanceAdviceDisabled = !currentInstanceId;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (alertMessage) {
        dispatch(
          setMessage({
            message: "",
            type: null,
          })
        );
      }
    }, 3000);
    return () => clearTimeout(timeout);
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
        <Button
          variant="contained"
          color="error"
          startIcon={<CloseIcon />}
          disabled={isCancelDisabled}
          onClick={handleResetFormData}
        >
          Cancel
        </Button>
        {currentInstanceId && (
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
        )}
        <Button
          id="savePortfolio"
          onClick={handleSavePortFolio}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={isSaveDisabled}
        >
          Save
        </Button>
        <Button
          id={"instanceAdvice"}
          variant="contained"
          startIcon={<BuildIcon />}
          disabled={isInstanceAdviceDisabled}
          onClick={() => navigate("/instanceAdvice")}
        >
          Instance advice
        </Button>
      </Box>

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
    </Box>
  );
}

const BottomBarWithBoundary = withErrorBoundary(
  BottomBar,
  "Bottom bar component has some Errors"
);
export default BottomBarWithBoundary;
