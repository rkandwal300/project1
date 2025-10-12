import React, { useState, useCallback, memo } from "react";
import HoverComponent from "./HoverComponent";
import FormControl from "src/components/template/FormControl.jsx";
import InputLabel from "src/components/template/InputLabel.jsx";
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
  const [selectOpen, setSelectOpen] = useState(false);

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

  const handleOpen = useCallback(() => setSelectOpen(true), []);
  const handleClose = useCallback(() => setSelectOpen(false), []);

  return (
    <HoverComponent
      tooltipMessage={selectOpen ? "" : tooltipMessage}
      value={value}
      onClear={handleClear}
    >
      <FormControl fullWidth={fullWidth} required={required} size={size}>
        {label && <InputLabel>{label}</InputLabel>}
        <SelectHoc
          value={value}
          onChange={handleChange}
          label={label}
          options={options}
          onOpen={handleOpen}
          onClose={handleClose}
          {...rest}
          error={false} // TODO: change it to props.error if error handling is needed
        />
      </FormControl>
    </HoverComponent>
  );
});

export default HoverSelect;
