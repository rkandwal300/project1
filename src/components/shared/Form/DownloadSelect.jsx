import React from "react";
import { Button, FormControl, InputLabel } from "@mui/material";
import SelectHoc from "@/components/ui/Select";

const menuItems = [
  {
    value: "download_template",
    label: "Download Template",
    href: "/Sample_template.xlsx",
  },
  {
    value: "download_self_pref_template",
    label: "Download Self Perf Assessment",
    href: "/self_perf_assessment.xlsx",
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
      <InputLabel id="download-select-label">Downloads</InputLabel>
      <SelectHoc
        labelId="download-select-label"
        id="step-five-target"
        label="Downloads"
        options={menuItems.map((item) => (
          <Button
            component="a"
            key={item.value}
            href={item.href}
            download
            id="step-six-target"
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
            {item.label}
          </Button>
        ))}
      />
    </FormControl>
  );
};

export default DownloadSelect;
