import * as React from "react";
import Popover from "@mui/material/Popover";

export default function PopoverHoc({ trigger, content, ...rest }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {trigger({ handleOpen: handleClick, open, anchorEl })}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        {...rest}
      >
        {content(handleClose)}
      </Popover>
    </div>
  );
}
