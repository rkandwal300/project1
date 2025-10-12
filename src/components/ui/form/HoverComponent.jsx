import React, { useState } from "react";
import Tooltip from "src/components/template/Tooltip.jsx";
import IconButton from "src/components/template/IconButton.jsx";
import { ClearIcon } from "src/components/template/icons.js";
import useTheme from "src/components/template/useTheme.jsx";

const HoverComponent = React.memo(function HoverInput({
  tooltipMessage = "Enter something...",
  value,
  onClear,
  children,
  hideClearIcon = false,
  position,
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const theme = useTheme();

  const showClear = Boolean(value && (hovered || focused));

  return (
    <Tooltip
      position={position}
      title={tooltipMessage}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.primary.contrastText,
          },
        },
      }}
    >
      <fieldset
        tabIndex={-1}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ display: "flex", position: "relative", alignItems: "center", border: "none", padding: 0, margin: 0 }}
      >
        {children}

        {showClear && (
          <IconButton
            aria-label="clear input"
            onClick={onClear}
            edge="end"
            size="small"
            sx={{
              visibility: hideClearIcon ? "hidden" : "visible",
              position: "absolute",
              right: 6,
              scale: "0.8",
              bgcolor: theme.palette.grey[600],
              color: theme.palette.primary.contrastText,
              borderRadius: "50%",
              p: 0.5,
              ml: 0.5,
              "&:hover": {
                bgcolor: theme.palette.grey[700],
              },
              "@media (hover: none)": {
                visibility: value ? "visible" : "hidden",
              },
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </fieldset>
    </Tooltip>
  );
});

export default HoverComponent;
