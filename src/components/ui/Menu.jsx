import * as React from "react";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/material/styles";
import ErrorBoundary from "../shared/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { selectMenuAnchorEl } from "@/redux/features/menu/menu.selector";
import { closeMenu, openMenu } from "@/redux/features/menu/menu.slice";

export default function MenuHoc({ trigger, content, ...props }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const anchorEl= useSelector(selectMenuAnchorEl)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (anchorEl === event.currentTarget) {
      dispatch(closeMenu());  
    } else {
      dispatch(openMenu(event.currentTarget)); 
    }
  };
  const handleClose = () => {
    dispatch(closeMenu());
  };
 
  return (
   <ErrorBoundary fallback={<div>Error in menu hoc</div>}>
     <div>
      {trigger({ onClick : handleClick, open })}
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
        {content({ onClose:handleClose })}
      </Menu>
    </div></ErrorBoundary>
  );
}
