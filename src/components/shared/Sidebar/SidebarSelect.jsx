import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Typography,
} from "@mui/material";
import ProviderDisplay from "./ProviderDisplay";
import { useSelector } from "react-redux";
import { selectCurrentProviderName } from "@/redux/features/providerData/providerData.selector";
import PopoverHoc from "@/components/ui/Popover";

const SidebarSelect = () => {
  const currentProvider = useSelector(selectCurrentProviderName); 
  return (
    <PopoverHoc
      trigger={({ handleOpen }) => (
        <FormControl fullWidth size="small" variant="outlined">
          <InputLabel sx={{ fontWeight: 500 }}>Service Provider</InputLabel>
          <OutlinedInput
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
      content={(handleClose) => <ProviderDisplay onClose={handleClose} />}
    />
  );
};

export default SidebarSelect;
