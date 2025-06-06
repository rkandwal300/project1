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
              color: theme.palette.grey[800],
            },
          },
        }}
      >
        {serviceProviderOptions.map((group) => [
          <ListSubheader
            key={group.label}
            sx={{
              color: theme.palette.dark,
              fontSize: "16px",
            }}
          >
            {group.label}
          </ListSubheader>,
          ...group.options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ height: "40px" }}
              id={`MenuItem-${option.value}`}
            >
              {option.label}
            </MenuItem>
          )),
        ])}
      </Select>
    </FormControl>
  );
};

export default SidebarSelect;
