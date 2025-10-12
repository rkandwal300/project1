import { Tooltip, useTheme } from "../template/index.js";

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

export default TooltipHoc;
