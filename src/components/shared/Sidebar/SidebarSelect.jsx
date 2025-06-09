import React, { lazy, Suspense, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { serviceProviderOptions } from "@/lib/constant";

// Lazy load MUI components
const FormControl = lazy(() => import("@mui/material/FormControl"));
const InputLabel = lazy(() => import("@mui/material/InputLabel"));
const Select = lazy(() => import("@mui/material/Select"));
const MenuItem = lazy(() => import("@mui/material/MenuItem"));
const ListSubheader = lazy(() => import("@mui/material/ListSubheader"));

const SidebarSelect = React.memo(({ label = "", value = "", onValueChange }) => {
  const theme = useTheme();
 
  const menuItems = useMemo(
    () =>
      serviceProviderOptions.flatMap((group) => [
        <ListSubheader
          key={group.label}
          sx={{
            color: theme.palette.dark,
            fontSize: "16px",
          }}
        >
          {group.label}
        </ListSubheader>,
        ...group.options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ height: "40px" }}
            id={`MenuItem-${option.value}`}
          >
            {option.label}
          </MenuItem>
        )),
      ]),
    [theme]
  );

  return (
    <Suspense fallback={null}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>{label || "Service Provider"}</InputLabel>
        <Select
          value={value}
          onChange={onValueChange}
          label={label || "Service Provider"}
          id="step-six-target"
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
                overflowY: "auto",
                color: theme.palette.grey[800],
              },
            },
          }}
        >
          {menuItems}
        </Select>
      </FormControl>
    </Suspense>
  );
});

export default SidebarSelect;
