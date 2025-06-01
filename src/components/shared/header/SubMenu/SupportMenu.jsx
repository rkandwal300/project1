import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { supportMailtoLink, supportMobileNumber } from "@/lib/constant";

function SupportMenu() {
  const theme = useTheme(); 

  const commonTextStyles = {
    primaryTypographyProps: { fontWeight: "bold", color: theme.palette.primary.contrastText },
    secondaryTypographyProps: { color: theme.palette.primary.contrastText },
  };

  return (
    <>
      <MenuItem component="a" href={supportMobileNumber}>
        <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText
          primary="Hotline Number"
          secondary={supportMailtoLink}
          {...commonTextStyles}
        />
      </MenuItem>
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <MenuItem component="a" href={supportMailtoLink}>
        <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText
          primary="Email"
          secondary={supportMobileNumber}
          {...commonTextStyles}
        />
      </MenuItem>
    </>
  );
}

export default SupportMenu;
