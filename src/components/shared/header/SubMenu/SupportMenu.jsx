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

function SupportMenu() {
  const theme = useTheme();
  const number = "+1 (502) 388-6228";
  const email = "dl.epycservices@amd.com";

  const commonTextStyles = {
    primaryTypographyProps: { fontWeight: "bold", color: theme.palette.text.primary },
    secondaryTypographyProps: { color: theme.palette.text.primary },
  };

  return (
    <>
      <MenuItem component="a" href={`tel:${number}`}>
        <ListItemIcon sx={{ color: theme.palette.text.primary }}>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText
          primary="Hotline Number"
          secondary={number}
          {...commonTextStyles}
        />
      </MenuItem>
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <MenuItem component="a" href={`mailto:${email}`}>
        <ListItemIcon sx={{ color: theme.palette.text.primary }}>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText
          primary="Email"
          secondary={email}
          {...commonTextStyles}
        />
      </MenuItem>
    </>
  );
}

export default SupportMenu;
