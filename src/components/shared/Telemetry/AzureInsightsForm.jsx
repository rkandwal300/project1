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
import { azureAppSchema } from "@/lib/validation/azureInsight.schema";

const inputStyle = { fontWeight: 600 };

const divStyle = {
  display: "grid",
  gridTemplateColumns: { sm: "repeat(3, 1fr)" },
  gap: 2,
  mb: 2,
};

function AzureInsightsForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isEdit = queryParams.get("edit");
  const regionOptions = useSelector(selectCurrentProviderRegions);
  const telemetryResetFlag = useSelector(selectTelemetryResetFlag);
  const currentInstance = useSelector(selectCurrentInstance);
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [showClientId, setShowClientId] = useState(false);
  const [formError, setFormError] = useTimedMessage();
  const [formSuccess, setFormSuccess] = useTimedMessage();

  const { register, handleSubmit, control, reset,formState :{errors},watch} = useForm({
    resolver: zodResolver(azureAppSchema),
    defaultValues: {
      portfolioName: "",
      regions: [],
      clientId: "",
      clientSecret: "",
      tenantId: "",
      subscriptionId: "",
    },
  });
  console.log({watch:watch(),errors})

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
        type: telemetryTypes.AZURE_INSIGHTS,
      })
    );
    setFormSuccess("Azure Insights connection is successful");
    setFormError("");
  };

  const handleError = (errors) => {
    setFormError("Please enter the required fields.",errors);
  };

  const isAllSelected = (selected) =>
    regionOptions.length > 0 && selected.length === regionOptions.length;

  const handleToggleSelectAll = (selected, onChange) => {
    if (selected.includes("selectAll")) {
      const allSelected = isAllSelected(selected.filter((v) => v !== "selectAll"));
      onChange(allSelected ? [] : regionOptions);
    } else {
      onChange(selected.filter((v) => v !== "selectAll"));
    }
  };

  useEffect(() => {
    if (isEdit) {
      reset(currentInstance?.formData);
    }
  }, [currentInstance?.formData, isEdit, reset]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit, handleError)}
      sx={{ backgroundColor: "white", p: 2, width: "100%" }}
    >
      <Box sx={divStyle}>
        <TextField
          label="Portfolio Name"
          fullWidth
          {...register("portfolioName")}
          InputProps={{ style: inputStyle }}
        />
        <FormControl fullWidth>
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
                sx={inputStyle}
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

      <Box sx={divStyle}>
        <TextField
          label="Client ID"
          fullWidth
          {...register("clientId")}
          type={showClientId ? "text" : "password"}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowClientId((show) => !show)}
                  edge="end"
                  size="small"
                >
                  {showClientId ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Client Secret"
          fullWidth
          {...register("clientSecret")}
          type={showClientSecret ? "text" : "password"}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowClientSecret((show) => !show)}
                  edge="end"
                  size="small"
                >
                  {showClientSecret ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={divStyle}>
        <TextField
          label="Tenant ID"
          fullWidth
          {...register("tenantId")}
          InputProps={{ style: inputStyle }}
        />
        <TextField
          label="Subscription ID"
          fullWidth
          {...register("subsId")}
          InputProps={{ style: inputStyle }}
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ gridColumn: "span 1", textTransform: "none" }}
        >
          <Typography variant="body2" fontWeight={600}>
            Test Connection
          </Typography>
        </Button>
      </Box>

      {formError && <FormAlert severity="error">{formError}</FormAlert>}
      {formSuccess && <FormAlert severity="success">{formSuccess}</FormAlert>}
    </Box>
  );
}

export default AzureInsightsForm;
