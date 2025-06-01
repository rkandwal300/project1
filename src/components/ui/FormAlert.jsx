import { Alert, Snackbar, Button } from "@mui/material";
import PropTypes from "prop-types";
import { ALERT_TIMEOUT } from "@/hooks/useTimedMessage";

function FormAlert({ open, severity, children, onClose, ...props }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={ALERT_TIMEOUT}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        icon={false}
        severity={severity}
        sx={{
          maxWidth: { xs: "100%", sm: "400px" },
          textAlign: "center",
          "& .MuiAlert-message": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
          },
        }}
        onClose={onClose}
        action={
          <Button color="inherit" size="small" onClick={onClose}>
            Close
          </Button>
        }
        {...props}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}

FormAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default FormAlert;
