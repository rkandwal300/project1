import React, { useEffect, lazy, Suspense, useCallback, useMemo } from "react";
import { TextField, Button, Typography, Box, useTheme, Skeleton } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  setTelemetryData,
  setTelemetryConnectionStatus,
  telemetryConnectionStatus,
  telemetryTypes,
  toggleResetTelemetry,
} from "@/redux/features/telemetry/telemetry.slice";
import { selectTelemetryResetFlag } from "@/redux/features/telemetry/telemetry.selector";
import { selectCurrentProviderRegions } from "@/redux/features/providerData/providerData.selector";
import { selectCurrentInstance } from "@/redux/features/instanceList/instanceList.selector";
import { azureAppSchema } from "@/lib/validation/azureInsight.schema";
import useTimedMessage from "@/hooks/useTimedMessage";

// Lazy loaded components
const FormAlert = lazy(() => import("@/components/ui/FormAlert"));
const PasswordField = lazy(() => import("@/components/ui/PasswordField"));
const RegionsSelect = lazy(() => import("@/components/ui/RegionSelect"));

const inputStyle = { fontWeight: 600 };
const divStyle = {
  display: "grid",
  gridTemplateColumns: { sm: "repeat(3, 1fr)" },
  gap: 2,
  mb: 2,
};

const defaultFormValues = {
  portfolioName: "",
  regions: [],
  clientId: "",
  clientSecret: "",
  tenantId: "",
  subscriptionId: "",
};

function AzureInsightsForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const isEdit = queryParams.get("edit");
  const regionOptions = useSelector(selectCurrentProviderRegions);
  const telemetryResetFlag = useSelector(selectTelemetryResetFlag);
  const currentInstance = useSelector(selectCurrentInstance);

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(azureAppSchema),
    defaultValues: defaultFormValues,
  });

  // Reset form on telemetry reset flag
  useEffect(() => {
    if (telemetryResetFlag) {
      reset({ ...defaultFormValues, regions: [] });
      dispatch(toggleResetTelemetry());
    }
  }, [telemetryResetFlag, reset, dispatch]);

  // Populate form in edit mode
  useEffect(() => {
    if (isEdit && currentInstance?.formData) {
      reset(currentInstance.formData);
    }
  }, [currentInstance?.formData, isEdit, reset]);

  const onSubmit = useCallback(
    (values) => {
      dispatch(setTelemetryData(values));
      dispatch(
        setTelemetryConnectionStatus({
          connectionStatus: telemetryConnectionStatus.CONNECTED,
          type: telemetryTypes.AZURE_INSIGHTS,
        })
      );
      setFormSuccess("Azure Insights connection is successful");
      setFormError("");
    },
    [dispatch, setFormSuccess, setFormError]
  );

  const handleError = useCallback(
    (errors) => {
      setFormError("Please enter the required fields.", errors);
    },
    [setFormError]
  );

  // Reusable renderers
  const renderTextField = useCallback(
    (label, name) => (
      <TextField
        label={label}
        fullWidth
        {...register(name)}
        slotProps={{ input: { style: inputStyle } }}
      />
    ),
    [register]
  );

  return (
    <Suspense fallback={<Skeleton height={400} fullWidth/>}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit, handleError)}
        sx={{ backgroundColor: "white", p: 2, width: "100%" }}
      >
        <Box sx={divStyle}>
          {renderTextField("Portfolio Name", "portfolioName")}
          <Controller
            name="regions"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <RegionsSelect
                control={control}
                regionOptions={regionOptions}
                value={value}
                onChange={onChange}
                theme={theme}
                sx={inputStyle}
              />
            )}
          />
        </Box>

        <Box sx={divStyle}>
          <PasswordField
            label="Client ID"
            register={register}
            name="clientId"
          />
          <PasswordField
            label="Client Secret"
            register={register}
            name="clientSecret"
          />
        </Box>

        <Box sx={divStyle}>
          {renderTextField("Tenant ID", "tenantId")}
          {renderTextField("Subscription ID", "subsId")}
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: "none", minWidth: 150 }}
            >
              <Typography variant="button" fontWeight={400}>
                Test Connection
              </Typography>
            </Button>
          </Box>
        </Box>

        {formError && <FormAlert severity="error">{formError}</FormAlert>}
        {formSuccess && <FormAlert severity="success">{formSuccess}</FormAlert>}
      </Box>
    </Suspense>
  );
}

export default AzureInsightsForm;
