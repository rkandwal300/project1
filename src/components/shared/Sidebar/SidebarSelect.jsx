import React from "react";
import {
  ListSubheader,
  useTheme,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { serviceProviderOptions } from "@/lib/constant";
import ProviderDisplay from "./ProviderList";

const SidebarSelect = ({ label = "", value = "", onValueChange }) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Service Provider</InputLabel>
      <Select
        value={value}
        onChange={onValueChange}
        label={label}
        id="step-six-target"
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300,
              overflowY: "auto",
              bgcolor: "transparent",
            },
          },
          
        }}
      >
         <ProviderDisplay />
      </Select>
    </FormControl>
  );
};

export default SidebarSelect;
