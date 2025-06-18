import React from "react";
import { Button, FormControl, InputLabel } from "@mui/material";
import SelectHoc from "@/components/ui/Select";

const menuItems = [
  {
    value: "download_template",
    label: "Download Template",
    href: "/Sample_template.xlsx",
    id: "downloadSelectTemplate",
  },
  {
    value: "download_self_pref_template",
    label: "Download Self Perf Assessment",
    href: "/self_perf_assessment.xlsx",
    id: "downloadSelectSelfPerfTemplate",
  },
];

const formControlSx = {
  backgroundColor: "black",
  borderRadius: 1,
  minWidth: 120,
  width: "100%",
  "& .MuiInputBase-root": {
    color: "white",
    borderRadius: 1,
    height: 40,
    backgroundColor: "black",
  },
  "& .MuiInputLabel-root": {
    color: "white",
    top: "-5px",
  },
  "& .MuiSelect-icon": {
    color: "white",
  },
  "& .Mui-focused .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
};

const DownloadSelect = () => {
  return (
    <FormControl fullWidth variant="filled" size="small" sx={formControlSx}>
      <InputLabel id="download-select-label" shrink={false}>Downloads</InputLabel>
      <SelectHoc
        menucomponent="a"
        labelId="download-select-label"
        id="step-five-target"
        label="Downloads"
        options={menuItems} 
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        menuProps={
          option =>({
            href: option.href,
          })
        }
        />
    </FormControl>
  );
};

export default DownloadSelect;
