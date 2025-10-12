import * as React from "react";
import { Menu, useTheme } from "../template/index.js";

export default function MenuHoc({ trigger, content, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();

  const handleClick = (event) => {
    if (anchorEl === event.currentTarget) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   
      <div>
        {trigger({ onClick: handleClick, open })}
        <Menu
          slotProps={{
            paper: {
              sx: {
                bgcolor: "#1A1A1A",
                color: theme.palette.primary.contrastText,
                minWidth: 150,
              },
            },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          {...props}
        >
          {content({ onClose: handleClose })}
        </Menu>
      </div>
  );
}
