import * as React from "react"; 
import Dialog from "@mui/material/Dialog";

export default function DialogHoc({ trigger,content, ...props }) {
  const { maxWidth = "md" } = props;
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {trigger({ onClick })}
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        {...props}
      >
    {content({ onClick })}
      </Dialog>
    </React.Fragment>
  );
}
