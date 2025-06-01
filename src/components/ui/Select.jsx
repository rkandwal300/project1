import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const SelectHoc = ({
  options = [],
  label,
  value = "",
  onChange,
  menuPosition = "bottom",
  getOptionLabel = (option) => option,
  getOptionValue = (option) => option,
  renderNone = true, 
  MenuProps = {},
  ...props
}) => {
  const mergedMenuProps = {
    anchorOrigin: {
      vertical: menuPosition === "top" ? "top" : "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: menuPosition === "top" ? "bottom" : "top",
      horizontal: "left",
    },
    PaperProps: {
      style: {
        maxHeight: 300,
        overflowY: "auto",
        ...MenuProps?.PaperProps?.style,
      },
      ...MenuProps?.PaperProps,
    },
    ...MenuProps,
  };

  return (
    <Select 
      value={value}
      onChange={onChange}
      label={label}
      MenuProps={mergedMenuProps}
      displayEmpty={renderNone}
      {...props}
    > 
      {options.map((option) => (
        <MenuItem value={getOptionValue(option)} key={getOptionValue(option)}>
          {getOptionLabel(option)}
        </MenuItem>
      ))}
    </Select>
  );
};

SelectHoc.displayName = "SelectHoc";

SelectHoc.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  menuPosition: PropTypes.oneOf(["top", "bottom"]),
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  renderNone: PropTypes.bool, 
  MenuProps: PropTypes.object,
};

export default SelectHoc;
