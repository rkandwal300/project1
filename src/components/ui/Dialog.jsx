import * as React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";


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
  );
}

DialogHoc.propTypes = {
  trigger: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};