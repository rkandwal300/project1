import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import HoverComponent from "./HoverComponent";

const HoverInput = React.memo(function HoverInput({
  tooltipMessage = "Enter something...",
  value: controlledValue,
  onChange,
  hideClearIcon = false,
  sx,
  ...restProps
}) {
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Memoize handlers for performance
  const handleChange = useCallback(
    (e) => {
      onChange?.(e);
      if (!isControlled) setUncontrolledValue(e.target.value);
    },
    [onChange, isControlled]
  );

  const handleClear = useCallback(() => {
    const event = { target: { value: "" } };
    onChange?.(event);
    if (!isControlled) setUncontrolledValue("");
  }, [onChange, isControlled]);

  // Merge custom and default styles
  const mergedSx = useMemo(
    () => ({
      "& .MuiInputBase-input": { paddingRight: "36px" },
      ...sx,
    }),
    [sx]
  );

  return (
    <HoverComponent
      tooltipMessage={tooltipMessage}
      value={value}
      onClear={handleClear}
      hideClearIcon={hideClearIcon}
    >
      <TextField
        value={value}
        onChange={handleChange}
        variant="outlined"
        size="small"
        sx={mergedSx}
        {...restProps}
        error={false} // TODO: change it to props.error if error handling is needed
        helperText={""} // TODO: change it to props.helperText if helper text is needed
      />
    </HoverComponent>
  );
});

HoverInput.propTypes = {
  tooltipMessage: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  hideClearIcon: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default HoverInput;
