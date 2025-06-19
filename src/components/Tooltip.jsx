import { useTheme } from "@emotion/react";
import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";

function TooltipHoc({message,children}) { 

  const theme = useTheme();
 

  return (
    <Tooltip
      title={message}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: theme.palette.grey[300],
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
