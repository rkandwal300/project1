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
  menuprops = {},
  getMenuProps,
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
        ...menuprops?.PaperProps?.style,
      },
      ...menuprops?.PaperProps,
    },
    ...menuprops,
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      label={label}
      MenuProps={mergedMenuProps}
      {...props}
    >
      {options.map((option) => (
        <MenuItem
          {...(props.menucomponent ? { component: props.menucomponent } : {})}
          value={getOptionValue(option)}
          key={getOptionValue(option)}
          id={option.id}
          {...(getMenuProps ? getMenuProps(option) : {})}
        >
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
  menuprops: PropTypes.object,
  menucomponent: PropTypes.string,
  getMenuProps: PropTypes.func,
};

export default SelectHoc;
