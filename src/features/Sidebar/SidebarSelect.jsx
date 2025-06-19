import React from "react";
import { FormControl, InputLabel, OutlinedInput, Box } from "@mui/material";
import ProviderDisplay from "./ProviderDisplay";
import {
  selectCurrentProviderName,
  selectCurrentProviderTelemetryCloud,
  selectCurrentProviderType,
  selectProviderList,
} from "@/redux/features/providerData/providerData.selector";
import PopoverHoc from "@/components/Popover";
import { useTheme } from "@emotion/react";
import SelectHoc from "@/components/Select";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setTelemetryCloud } from "@/redux/features/providerData/providerData.slice";
import { TELEMETRY_TYPES } from "@/redux/features/telemetry/telemetry.slice";

const SidebarSelect = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const providers = useSelector(selectProviderList);
  const currentProvider = useSelector(selectCurrentProviderName);
  const currentProviderType = useSelector(selectCurrentProviderType);
  const currentTelemetryCloud = useSelector(
    selectCurrentProviderTelemetryCloud
  );

  const telemetryOptions = providers.map((provider) => provider.cloud.name);

  const handleTelemetryCloudChange = (event) => {
    const selectedCloud = event.target.value;
    dispatch(setTelemetryCloud(selectedCloud));
    navigate("/telemetry");
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PopoverHoc
      
        trigger={({ handleOpen }) => (
          <FormControl
            fullWidth
            size="small"
            variant="outlined"
            sx={{ height: "58px" }}
          >
            <InputLabel sx={{ fontWeight: 500 }}>Service Provider</InputLabel>
            <OutlinedInput
            id="step-six-target"
              readOnly
              label="Service Provider"
              value={currentProvider || "Select Provider"}
              onClick={handleOpen}
              endAdornment={<Box sx={{ pointerEvents: "none", pr: 1 }}>▾</Box>}
              inputProps={{
                style: {
                  fontSize: "16px",
                  fontWeight: 300,
                  cursor: "pointer",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                },
              }}
            />
          </FormControl>
        )}
        content={(handleClose) => (
          <ProviderDisplay data={providers} onClose={handleClose} />
        )}
      />
      {currentProviderType == "telemetry" &&
        ![TELEMETRY_TYPES.AWS_CLOUDWATCH, TELEMETRY_TYPES.AZURE_INSIGHTS].includes(currentProvider) && (
          <FormControl fullWidth variant="outlined">
            <InputLabel>Cloud*</InputLabel>
            <SelectHoc
              value={currentTelemetryCloud}
              onChange={handleTelemetryCloudChange}
              label="Cloud*"
              menuprops={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                    overflowY: "auto",
                    color: theme.palette.grey[800],
                  },
                },
              }}
              options={telemetryOptions}
            />
          </FormControl>
        )}
    </div>
  );
};

export default SidebarSelect;
