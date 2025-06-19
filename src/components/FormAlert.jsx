import { Alert, Snackbar, Button } from "@mui/material";
import PropTypes from "prop-types";
import { ALERT_TIMEOUT } from "@/hooks/useTimedMessage";
import ErrorBoundary from "@/features/ErrorBoundary"; 

function FormAlert({ open, severity, children, onClose, ...props }) {
  return (
  <ErrorBoundary fallback={<div>Error in FormAlert component</div>}>
    <Snackbar
      open={open}
      autoHideDuration={ALERT_TIMEOUT}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      {...props}
    >
      <Alert
        onClose={onClose}
        severity={severity ||'info'}
        sx={{ width: "100%" }}
        action={
          <Button color="inherit" size="small" onClick={onClose}>
            Close
          </Button>
        }
      >
        {children}
      </Alert>
    </Snackbar>
    </ErrorBoundary>
  );
}

FormAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default FormAlert;
