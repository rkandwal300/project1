import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { Paper } from "@mui/material";

const SelectHoc = ({
  options = [],
  label,
  value = "",
  onChange,
  menuPosition = "bottom", // "bottom" or "top"
  ...props
}) => {
  const menuProps = {
    anchorOrigin: {
      vertical: menuPosition === "top" ? "top" : "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: menuPosition === "top" ? "bottom" : "top",
      horizontal: "left",
    },
    getContentAnchorEl: null, // For MUI v4; remove if using MUI v5+
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      label={label}
      {...props}
      MenuProps={{
        ...menuProps,
        PaperProps: {
          style: {

            maxHeight: 300,  
            overflowY: "auto",  
            ...props.MenuProps?.PaperProps?.style,
          },
          ...props?.MenuProps?.PaperProps
        },
      }}
      >
      {options.length === 0 ? (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      ) : (
        options.map((val) => (
          <MenuItem value={val} key={val}>
            {val}
          </MenuItem>
        ))
      )}
    </Select>
  );
};

export default SelectHoc;

SelectHoc.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  menuPosition: PropTypes.oneOf(["top", "bottom"]),
};
