import React, { useEffect, useCallback, useMemo } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dataDogSchema } from "@/lib/validation/dataDog.schema";
import FormAlert from "@/components/ui/FormAlert";
import useTimedMessage from "@/hooks/useTimedMessage";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentProviderRegions } from "@/redux/features/providerData/providerData.selector";
import { useTheme } from "@emotion/react";
import {
  setTelemetryData,
  setTelemetryConnectionStatus,
  telemetryConnectionStatus,
  telemetryTypes,
  toggleResetTelemetry,
} from "@/redux/features/telemetry/telemetry.slice";
import { selectTelemetryResetFlag } from "@/redux/features/telemetry/telemetry.selector";
import { useLocation } from "react-router-dom";
import { selectCurrentInstance } from "@/redux/features/instanceList/instanceList.selector";
import PasswordField from "@/components/ui/PasswordField";
import RegionsSelect from "@/components/ui/RegionSelect";

const inputStyle = { fontWeight: 600 };

const getSchema = (type) =>
  type === telemetryTypes.AWS_CLOUDWATCH
    ? dataDogSchema.omit({ hostTag: true })
    : dataDogSchema;

const getApiKeyLabel = (type) =>
  type === telemetryTypes.AWS_CLOUDWATCH ? "Access Key" : "API Key";

const getAppKeyLabel = (type) =>
  type === telemetryTypes.AWS_CLOUDWATCH ? "App Secret" : "Application Key";

function DatadogForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const type = queryParams.get("type");
  const isEdit = queryParams.get("edit");
  const regionOptions = useSelector(selectCurrentProviderRegions);
  const telemetryResetFlag = useSelector(selectTelemetryResetFlag);
  const currentInstance = useSelector(selectCurrentInstance);

  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  const schema = useMemo(() => getSchema(type), [type]);

  const { register, handleSubmit, control, reset, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      portfolioName: "",
      regions: [],
    },
  });

  useEffect(() => {
    if (telemetryResetFlag) {
      reset({ regions: [] });
      dispatch(toggleResetTelemetry());
    }
  }, [telemetryResetFlag, reset, dispatch]);

  useEffect(() => {
    if (isEdit && currentInstance?.formData) {
      reset(currentInstance.formData);
    }
  }, [currentInstance?.formData, isEdit, reset]);

  const handlePortfolioChange = useCallback(
    (e) => {
      const value = e.target.value;
      dispatch(setTelemetryData({ portfolioName: value }));
      setValue("portfolioName", value, { shouldValidate: true });
    },
    [dispatch, setValue]
  );

  const onSubmit = useCallback(
    (values) => {
      dispatch(setTelemetryData(values));
      dispatch(
        setTelemetryConnectionStatus({
          connectionStatus: telemetryConnectionStatus.CONNECTED,
          type: telemetryTypes.DATA_DOG,
        })
      );
      setFormSuccess("Datadog connection is successful");
      setFormError("");
    },
    [dispatch, setFormSuccess, setFormError]
  );

  const handleError = useCallback(
    () => setFormError("Please enter the required fields."),
    [setFormError]
  );

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit, handleError)}
      sx={{
        backgroundColor: "white",
        px: "5px",
        py: "10px",
        width: "100%",
        height: "fit-content",
      }}
    >
      {/* === First Row === */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(4, 1fr)" },
          gap: "5px",
          mb: 2,
        }}
      >
        <TextField
          label="Portfolio Name"
          fullWidth
          {...register("portfolioName")}
          sx={{ gridColumn: "span 2" }}
          slotProps={{ input: { style: inputStyle } }}
          onChange={handlePortfolioChange}
        />

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

      {/* === Second Row === */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(4, 1fr)" },
          gap: "5px",
          mb: 2,
          alignItems: "end",
        }}
      >
        <PasswordField
          label={getApiKeyLabel(type)}
          register={register}
          name="apiKey"
        />

        <PasswordField
          label={getAppKeyLabel(type)}
          register={register}
          name="appKey"
        />

        {type === telemetryTypes.DATA_DOG && (
          <TextField
            label="Host Tag"
            type="text"
            fullWidth
            {...register("hostTag")}
            slotProps={{ input: { style: inputStyle } }}
          />
        )}

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

      {/* Alerts */}
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

export default DatadogForm;
