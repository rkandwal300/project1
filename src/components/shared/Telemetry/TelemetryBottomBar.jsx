import React, { Suspense, useMemo, useCallback } from "react";
import { Box, Grid, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, matchPath } from "react-router-dom";

import {
  resetTelemetryData,
  telemetryConnectionStatus,
  toggleShowData,
} from "@/redux/features/telemetry/telemetry.slice";
import { selectTelemetryState } from "@/redux/features/telemetry/telemetry.selector";
import {
  addInstance,
  updateInstance,
} from "@/redux/features/instanceList/instanceList.slice";
import {
  selectCurrentInstance,
  selectInstanceList,
} from "@/redux/features/instanceList/instanceList.selector";
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";
import {
  errorMessageType,
  setMessage,
} from "@/redux/features/instance/instance.slice";
import FormAlert from "@/components/ui/FormAlert";
import { nanoid } from "@reduxjs/toolkit";
import {
  selectMessage,
  selectMessageType,
} from "@/redux/features/instance/instance.selector";

const TelemetryBottomBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    connectionStatus,
    name: portfolioName,
    data,
    formData,
    showData,
  } = useSelector(selectTelemetryState);
  const currentInstance = useSelector(selectCurrentInstance);
  const currentProviderName = useSelector(selectCurrentProviderName);
  const instanceList = useSelector(selectInstanceList);
  const alertMessage = useSelector(selectMessage);
  const alertMessageType = useSelector(selectMessageType);

  const queryParams = new URLSearchParams(location.search);
  const providerType = queryParams.get("type");

  const isConnected = connectionStatus === telemetryConnectionStatus.CONNECTED;
  const generatedFormId = useMemo(
    () => currentInstance?.id || nanoid(),
    [currentInstance?.id]
  );

  const trimmedName = useMemo(() => portfolioName?.trim(), [portfolioName]);

  const isDuplicate = useMemo(
    () =>
      instanceList.some(
        (instance) =>
          instance.name === trimmedName && providerType === currentProviderName
      ),
    [instanceList, trimmedName, providerType, currentProviderName]
  );

  const handleSaveInstances = useCallback(() => {
    if (!trimmedName) {
      return dispatch(
        setMessage({
          type: errorMessageType.ERROR,
          message: "Portfolio name is required",
        })
      );
    }

    if (isDuplicate && !currentInstance?.id) {
      return dispatch(
        setMessage({
          type: errorMessageType.ERROR,
          message: "Portfolio name already exists",
        })
      );
    }

    const payload = {
      id: generatedFormId,
      data,
      type: "telemetry",
      provider: currentProviderName,
      name: trimmedName,
      formData,
    };

    if (currentInstance?.id) {
      dispatch(updateInstance(payload));
    } else {
      dispatch(addInstance(payload));
    }
    dispatch(resetTelemetryData());

    navigate(`/telemetry/${generatedFormId}?type=${currentProviderName}`);

    dispatch(
      setMessage({
        type: errorMessageType.SUCCESS,
        message: `${trimmedName} saved successfully`,
      })
    );
  }, [
    trimmedName,
    isDuplicate,
    currentInstance?.id,
    generatedFormId,
    data,
    currentProviderName,
    formData,
    dispatch,
    navigate,
  ]);
  const isUpdatePage = matchPath("/telemetry/:id/edit", location.pathname);
  console.log({ isUpdatePage });
  return (
    <Box
      id="manage-portfolio-footer-action-container"
      className="action-footer"
      sx={{ p: 1 }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        wrap="nowrap"
      >
        <Grid item>
          <Button
            variant="contained"
            onClick={() => dispatch(resetTelemetryData())}
            disabled={!isConnected}
            color="error"
            id="btn-instance-list-cancel"
            startIcon={<CloseIcon />}
            sx={{ textTransform: "none", mr: 1 }}
          >
            Cancel
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            onClick={() => dispatch(toggleShowData())}
            disabled={!isConnected}
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              mr: 1,
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Fetch / Sync Instances
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            disabled={!isConnected || !showData}
            onClick={handleSaveInstances}
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              display: currentInstance?.id ? "none" : "block",
              mt: "4px",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Save Metrics
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveInstances}
              disabled={!isConnected || !showData}
            sx={{
              display: currentInstance?.id ? "block" : "none",
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              mt: "4px",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Update Metrics
          </Button>
        </Grid>
      </Grid>

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
};

export default TelemetryBottomBar;
