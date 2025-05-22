import * as React from "react";
import Menu from "@mui/material/Menu";
import { useTheme } from "@emotion/react"; 

export default function MenuHoc({ trigger, children, ...props }) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  }; 
  return (
    <div>
      {trigger({ onClick })}
      <Menu  slotProps={{ paper:{
        sx: {
          backgroundColor: theme.palette.primary.main,   
          color: theme.palette.primary.contrastText,     
          minWidth: 250,
        },
      }}} anchorEl={anchorEl} open={open} onClose={onClose} {...props}>
        {children}
      </Menu>
    </div>
  );
}
