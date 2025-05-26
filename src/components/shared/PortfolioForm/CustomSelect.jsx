import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import React from "react";

const CustomSelect = ({ selectedValue, handleChange }) => {
  return (
    <FormControl
      fullWidth
      variant="filled"
      size="small"
      sx={{
        backgroundColor: "black",
        borderRadius: "5px",
        minWidth: "120px",
        "& .MuiInputBase-root": {
          color: "white",
          borderRadius: "5px",
          height: "40px",
        },
        "& .MuiInputLabel-root": {
          color: "white",
          top: "-5px",
        },
        "& .MuiSelect-icon": {
          color: "white",
        },
        "&.MuiInputLabel-shrink": {
          color: "white",
          fontSize: "14px",
          top: "0px",
        },
      }}
    >
      <InputLabel id="download-select-label">Downloads</InputLabel>
      <Select
        labelId="download-select-label"
        id="download-select"
        value={selectedValue}
        onChange={handleChange}
        label="Downloads">
        <MenuItem value={"download_template"}>Download Template</MenuItem>
        <MenuItem value={"download_self_pref_template"}>
          Download Self Pref Template
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
