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

        "& button": {
          all: "unset",
          color: "inherit",
          font: "inherit",
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
        },
      }}
    >
      <InputLabel id="download-select-label">Downloads</InputLabel>
      <Select
        labelId="Download-Template-label"
        id="download-template"
        value={selectedValue}
        onChange={handleChange}
        label="Downloads"
      >
        <MenuItem value={"download_template"}>
          {" "}
          <Button
            component="a"
            href="/Sample_template.xlsx"
            download
            variant="text"
            sx={{
              all: "unset",
              color: "inherit",
              font: "inherit",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Download Template
          </Button>{" "}
        </MenuItem>
        <MenuItem value={"download_self_pref_template"}>
          <Button
            component="a"
            href="/self_perf_assessment.xlsx"
            download
            variant="text"
            sx={{
              all: "unset",
              color: "inherit",
              font: "inherit",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Download Self Perf Assessment
          </Button>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
