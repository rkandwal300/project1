
import React from "react";
import PropTypes from "prop-types";
import { Tooltip, useTheme } from "@mui/material";

function TooltipHoc({ message, children }) {

  const theme = useTheme();


  return (
    <Tooltip
      title={message}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: "#595959",
            color: theme.palette.primary.contrastText,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
TooltipHoc.propTypes = {
  message: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default TooltipHoc;
