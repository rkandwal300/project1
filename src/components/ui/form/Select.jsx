import React, { useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import HoverComponent from "./HoverComponent";
import { FormControl, InputLabel } from "@mui/material";
import SelectHoc from "../Select";

const HoverSelect = memo(function HoverSelect({
  label,
  options = [],
  tooltipMessage = "Select an option...",
  value: controlledValue,
  onChange,
  fullWidth = true,
  size = "small",
  required = false,
  ...rest
}) {
  const [internalValue, setInternalValue] = useState("");

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (e) => {
      onChange?.(e);
      if (!isControlled) setInternalValue(e.target.value);
    },
    [onChange, isControlled]
  );

  const handleClear = useCallback(() => {
    const event = { target: { value: "" } };
    onChange?.(event);
    if (!isControlled) setInternalValue("");
  }, [onChange, isControlled]);

  return (
    <HoverComponent
      tooltipMessage={tooltipMessage}
      value={value}
      position={rest?.tooltipPosition}
      onClear={handleClear}
    >
      <FormControl fullWidth={fullWidth} required={required} size={size}>
        {label && <InputLabel>{label}</InputLabel>}
        <SelectHoc
          value={value}
          onChange={handleChange}
          label={label}
          options={options}
          {...rest}
          error={false} // TODO: change it to props.error if error handling is needed
        />
      </FormControl>
    </HoverComponent>
  );
});

HoverSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  tooltipMessage: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),
  required: PropTypes.bool,
  helperText: PropTypes.node,
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default HoverSelect;
