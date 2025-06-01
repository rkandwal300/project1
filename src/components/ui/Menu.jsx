import * as React from "react";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/material/styles";
import ErrorBoundary from "../shared/ErrorBoundary";

export default function MenuHoc({ trigger, content, ...props }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };
  return (
   <ErrorBoundary fallback={<div>Error in menu hoc</div>}>
     <div>
      {trigger({ onClick })}
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
        onClose={onClose}
        {...props}
      >
        {content({ onClose })}
      </Menu>
    </div></ErrorBoundary>
  );
}
