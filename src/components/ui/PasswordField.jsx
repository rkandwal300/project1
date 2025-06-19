import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
PasswordField.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default PasswordField;
