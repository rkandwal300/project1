import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ErrorBoundary from "../shared/ErrorBoundary";

export default function DialogHoc({ trigger, content, ...props }) {
  const { maxWidth = "md" } = props;
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <ErrorBoundary fallback={<div>Error in dialog</div>}>
      <React.Fragment>
        {trigger({ onClick })}
        <Dialog
          fullWidth={true}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          {...props}
        >
          {content({ handleClose })}
        </Dialog>
      </React.Fragment>
    // </ErrorBoundary>
  );
}
