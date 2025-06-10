import * as React from "react";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/material/styles";
import ErrorBoundary from "../shared/ErrorBoundary";

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
    <ErrorBoundary fallback={<div>Error in menu hoc</div>}>
      <div>
        {trigger({ onClick: handleClick, open })}
        <Menu
          slotProps={{
            paper: {
              sx: {
                bgcolor: theme.palette.primary.main,
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
    </ErrorBoundary>
  );
}
