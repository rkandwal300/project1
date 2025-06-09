import React, { Suspense, lazy, useMemo } from "react";
import { MenuItem, Divider, useTheme } from "@mui/material";
import { supportMailtoLink, supportMobileNumber } from "@/lib/constant";

// Dynamic imports for icons
const PhoneIcon = lazy(() => import("@mui/icons-material/Phone"));
const EmailIcon = lazy(() => import("@mui/icons-material/Email"));
const ListItemIcon = lazy(() =>
  import("@mui/material/ListItemIcon").then((mod) => ({ default: mod.ListItemIcon }))
);
const ListItemText = lazy(() =>
  import("@mui/material/ListItemText").then((mod) => ({ default: mod.ListItemText }))
);

function SupportMenu() {
  const theme = useTheme();

  // Memoize styles to avoid recalculation on each render
  const commonTextStyles = useMemo(
    () => ({
      primaryTypographyProps: {
        fontWeight: "bold",
        color: theme.palette.primary.contrastText,
      },
      secondaryTypographyProps: { color: theme.palette.primary.contrastText },
    }),
    [theme.palette.primary.contrastText]
  );

  // Extracted values for clarity and performance
  const hotlineNumber = useMemo(
    () => supportMobileNumber.split(":")[1],
    [supportMobileNumber]
  );
  const emailAddress = useMemo(
    () => supportMailtoLink.split(":")[1].split("?")[0],
    [supportMailtoLink]
  );

  return (
    <Suspense fallback={null}>
      <MenuItem component="a" href={supportMobileNumber}>
        <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText
          primary="Hotline Number"
          secondary={hotlineNumber}
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
          secondary={emailAddress}
          {...commonTextStyles}
        />
      </MenuItem>
    </Suspense>
  );
}

export default React.memo(SupportMenu);
