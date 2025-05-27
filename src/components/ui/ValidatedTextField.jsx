import { useCallback,  useState } from "react";
import PropTypes from "prop-types";
import { TextField, Box } from "@mui/material";
 
const ValidatedTextField = 
    (
        {
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
        },
    ) => { 
        const [touched, setTouched] = useState(false);

         
        const isError = useCallback(
            () =>
                typeof error === "boolean"
                    ? error
                    : required && touched && !value,
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
                    onBlur={e => {
                        setTouched(true);
                        onBlur?.(e);
                    }}
                    error={isError()}
                    helperText={
                        isError()
                            ? helperText || `${label} is required`
                            : helperText || ""
                    }
                    required={required}
                    fullWidth={fullWidth}
                    type={type}
                    slotProps={{
                        input: InputProps,
                        ...(rest.slotProps || {})
                    }}
                    {...rest}
                />
                
            </Box>
        );
    };

ValidatedTextField.displayName = "ValidatedTextField";

ValidatedTextField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string, 
    type: PropTypes.string,
    InputProps: PropTypes.object,
    textFieldRef: PropTypes.object
};

export default ValidatedTextField;
