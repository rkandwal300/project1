import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "../template/index.js";
import { VisibilityOffIcon, VisibilityIcon } from "../template/icons.js";

const inputStyle = { fontWeight: 600 };

const PasswordField = React.memo(function PasswordField({
  label,
  register,
  name,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  return (
    <TextField
      label={label}
      type={show ? "text" : "password"}
      fullWidth
      name={name}
      autoComplete="new-password"
      slotProps={{
        input: {
          ...register(name),
          style: inputStyle,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setShow((prev) => !prev)}>
                {show ? (
                  <VisibilityIcon sx={{ fontSize: 19 }} />
                ) : (
                  <VisibilityOffIcon sx={{ fontSize: 19 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  );
});

export default PasswordField;
