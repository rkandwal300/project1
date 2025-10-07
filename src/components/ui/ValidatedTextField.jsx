import { useCallback, useState } from "react";
import { TextField, Box } from "@mui/material";

const ValidatedTextField = ({
  label,
  id,
  value,
  name,
  onClick,
  onChange,
  onBlur,
  required = false,
  fullWidth = true,
  error,
  helperText,
  type = "text",
  InputProps,
  textFieldRef,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);

  const isError = useCallback(
    () => (typeof error === "boolean" ? error : required && touched && !value),
    [error, required, touched, value]
  );

  return (
    <Box>
      <TextField
        label={label}
        id={id}
        ref={textFieldRef}
        value={value}
        name={name}
        onClick={onClick}
        onChange={onChange}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        error={isError()}
        helperText={
          isError() ? helperText || `${label} is required` : helperText || ""
        }
        required={required}
        fullWidth={fullWidth}
        type={type}
        slotProps={{
          input: InputProps,
          ...(rest.slotProps || {}),
        }}
        {...rest}
      />
    </Box>
  );
};

ValidatedTextField.displayName = "ValidatedTextField";

export default ValidatedTextField;
