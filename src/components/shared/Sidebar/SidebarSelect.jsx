import React from "react";
import { 
  useTheme,
  Select,
  FormControl,
  InputLabel, 
} from "@mui/material"; 
import ProviderDisplay from "./ProviderDisplay";

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
              padding: 0,
              maxHeight: 300,
              overflowY: "auto",
              bgcolor: "transparent",
              boxShadow: "none",  
              backgroundImage: "none",  
            },
            elevation: 0, // Remove elevation
          },
          MenuListProps: {
            sx: {
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
