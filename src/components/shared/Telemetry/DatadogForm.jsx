import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

const inputStyle = { fontWeight: 600 };

function DatadogForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const isEdit = queryParams.get("edit");
  const regionOptions = useSelector(selectCurrentProviderRegions);
  const telemetryResetFlag = useSelector(selectTelemetryResetFlag);
  const currentInstance = useSelector(selectCurrentInstance);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAppKey, setShowAppKey] = useState(false);
  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  let schema = dataDogSchema;

  if (type === telemetryTypes.AWS_CLOUDWATCH) {
    schema = dataDogSchema.omit({ hostTag: true });
  }

  const { register, handleSubmit, control, reset, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      portfolioName: "",
      regions: [],
      apiKey: "",
      appKey: "",
    },
  });

  useEffect(() => {
    if (telemetryResetFlag) {
      reset({ regions: [] });
      dispatch(toggleResetTelemetry());
    }
  }, [telemetryResetFlag, reset, dispatch]);

  const onSubmit = (values) => {
    dispatch(setTelemetryData(values));
    dispatch(
      setTelemetryConnectionStatus({
        connectionStatus: telemetryConnectionStatus.CONNECTED,
        type: telemetryTypes.DATA_DOG,
      })
    );
    setFormSuccess("Datadog connection is successful");
    setFormError("");
  };

  const handleError = () => setFormError("Please enter the required fields.");

  const isAllSelected = (selected) =>
    regionOptions.length > 0 && selected.length === regionOptions.length;

  const handleToggleSelectAll = (selected, onChange) => {
    if (selected.includes("selectAll")) {
      const allSelected = isAllSelected(selected);
      onChange(allSelected ? [] : regionOptions);
    } else {
      onChange(selected.filter((v) => v !== "selectAll"));
    }
  };

  useEffect(() => {
    if (isEdit && currentInstance?.formData) {
      reset(currentInstance.formData);
    }
  }, [currentInstance?.formData, isEdit, reset]);

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
          InputProps={{ style: inputStyle }}
          onChange={(e) => {
            const value = e.target.value;
            dispatch(setTelemetryData({ portfolioName: value }));
            setValue("portfolioName", value, { shouldValidate: true });
          }}
        />

        <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
          <InputLabel id="regions-label">Regions</InputLabel>
          <Controller
            name="regions"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <Select
                labelId="regions-label"
                id="regions"
                multiple
                value={value}
                onChange={(e) =>
                  handleToggleSelectAll(e.target.value, onChange)
                }
                input={<OutlinedInput label="Regions" />}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: theme.palette.grey[800],
                      fontWeight: 400,
                    }}
                  >
                    {selected.length > 0 && <Chip label={selected[0]} />}
                    {selected.length > 1 && `(+${selected.length - 1} others)`}
                  </Box>
                )}
                sx={{ ...inputStyle }}
              >
                <MenuItem value="selectAll">
                  <Checkbox checked={isAllSelected(value)} />
                  Select All
                </MenuItem>
                {regionOptions.map((region) => (
                  <MenuItem key={region} value={region}>
                    <Checkbox checked={value.includes(region)} />
                    {region}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>

      {/* === Second Row === */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(4, 1fr)" },
          gap: "5px",
          mb: 2,
        }}
      >
        {/* API Key */}
        <TextField
          label={
            type === telemetryTypes.AWS_CLOUDWATCH ? "Access Key" : "API Key"
          }
          type={showApiKey ? "text" : "password"}
          fullWidth
          autoComplete="new-password"
          {...register("apiKey")}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowApiKey((prev) => !prev)}
                >
                  {showApiKey ? (
                    <VisibilityIcon sx={{ fontSize: 19 }} />
                  ) : (
                    <VisibilityOffIcon sx={{ fontSize: 19 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* App Key */}
        <TextField
          label={
            type === telemetryTypes.AWS_CLOUDWATCH
              ? "App Secret"
              : "Application Key"
          }
          type={showAppKey ? "text" : "password"}
          fullWidth
          autoComplete="new-password"
          {...register("appKey")}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowAppKey((prev) => !prev)}
                >
                  {showAppKey ? (
                    <VisibilityIcon sx={{ fontSize: 19 }} />
                  ) : (
                    <VisibilityOffIcon sx={{ fontSize: 19 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Host Tag */}
        {type == telemetryTypes.DATA_DOG && (
          <TextField
            label="Host Tag"
            type="text"
            fullWidth
            {...register("hostTag")}
            InputProps={{ style: inputStyle }}
          />
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ textTransform: "none" }}
        >
          <Typography variant="button" fontWeight={400}>
            Test Connection
          </Typography>
        </Button>
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
