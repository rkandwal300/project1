import React, { Suspense, useMemo, useCallback, lazy } from "react";
import { Box, Grid, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useTheme } from "@emotion/react";

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
import {
  selectMessage,
  selectMessageType,
} from "@/redux/features/instance/instance.selector";
import { mockFormDataResponse } from "@/lib/data";

// Dynamic import for FormAlert
const FormAlert = lazy(() => import("@/components/ui/FormAlert"));

// Utility: get trimmed name
const getTrimmedName = (name) => name?.trim() || "";

// Utility: check duplicate
const isDuplicateInstance = (instances, name, providerType, currentProvider) =>
  instances.some(
    (instance) => instance.name === name && providerType === currentProvider
  );

// Utility: build instance payload
const buildInstancePayload = ({ id, data, provider, name, formData }) => ({
  id,
  data,
  type: "telemetry",
  provider,
  name,
  formData,
});

const TelemetryBottomBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    connectionStatus,
    name: portfolioName,
    data: telemetryState,
    formData,
    showData,
  } = useSelector(selectTelemetryState);
  const currentInstance = useSelector(selectCurrentInstance);
  const currentProviderName = useSelector(selectCurrentProviderName);
  const instanceList = useSelector(selectInstanceList);
  const alertMessage = useSelector(selectMessage);
  const alertMessageType = useSelector(selectMessageType);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const providerType = queryParams.get("type");

  const isConnected = connectionStatus === telemetryConnectionStatus.CONNECTED;
  const generatedFormId = useMemo(
    () => currentInstance?.id || nanoid(),
    [currentInstance?.id]
  );
  const trimmedName = useMemo(
    () => getTrimmedName(portfolioName),
    [portfolioName]
  );
  const isDuplicate = useMemo(
    () =>
      isDuplicateInstance(
        instanceList,
        trimmedName,
        providerType,
        currentProviderName
      ),
    [instanceList, trimmedName, providerType, currentProviderName]
  );

  const showAlert = useCallback(
    (type, message) =>
      dispatch(
        setMessage({
          type,
          message,
        })
      ),
    [dispatch]
  );

  const telemetryData = [
    mockFormDataResponse,
    mockFormDataResponse,
    mockFormDataResponse,
  ].map((item) => ({
    ...item,
    id: nanoid(),
    uuid: currentProviderName,
  }));
  const handleSaveInstances = useCallback(() => {
    if (!trimmedName) {
      return showAlert(errorMessageType.ERROR, "Portfolio name is required");
    }
    if (isDuplicate && !currentInstance?.id) {
      return showAlert(errorMessageType.ERROR, "Portfolio name already exists");
    }

    const payload = buildInstancePayload({
      id: generatedFormId,
      data: telemetryData,
      telemetryState,
      provider: currentProviderName,
      name: trimmedName,
      formData,
    });

    if (currentInstance?.id) {
      dispatch(updateInstance(payload));
    } else {
      dispatch(addInstance(payload));
    }
    dispatch(resetTelemetryData());
    navigate(`/telemetry/${generatedFormId}?type=${currentProviderName}`);
    showAlert(errorMessageType.SUCCESS, `${trimmedName} saved successfully`);
  }, [
    trimmedName,
    isDuplicate,
    currentInstance?.id,
    generatedFormId,
    telemetryData,
    telemetryState,
    currentProviderName,
    formData,
    dispatch,
    navigate,
    showAlert,
  ]);

  const handleCancel = useCallback(
    () => dispatch(resetTelemetryData()),
    [dispatch]
  );

  const handleFetchSync = useCallback(
    () => dispatch(toggleShowData()),
    [dispatch]
  );

  const handleAlertClose = useCallback(
    () =>
      dispatch(
        setMessage({
          message: "",
          type: null,
        })
      ),
    [dispatch]
  );

  return (
    <Box
      id="manage-portfolio-footer-action-container"
      className="action-footer"
      sx={{
        p: 1,
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.grey[100],
        color: theme.palette.text.default,
      }}
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
            onClick={handleCancel}
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
            onClick={handleFetchSync}
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
              mt: "4px",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Save Metrics
          </Button>
        </Grid>
      </Grid>
      <Suspense fallback={null}>
        <FormAlert
          open={Boolean(alertMessageType)}
          severity={alertMessageType}
          onClose={handleAlertClose}
        >
          {alertMessage}
        </FormAlert>
      </Suspense>
    </Box>
  );
};

export default TelemetryBottomBar;
