import { useMemo } from "react";

export const useTableStyles = (variant, theme) =>
  useMemo(() => {
    if (variant === "primary") {
      return {
        row: { backgroundColor: theme.palette.dark },
        cell: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.grey[700],
          verticalAlign: "top",
          borderBottom: `1px solid ${theme.palette.secondary.default}`,
          padding: 2,
        },
        head: {
          verticalAlign: "top",
          padding: 2,
          color: "#299bff",
          borderBottom: "none",
          fontWeight: "bold",
        },
      };
    } 
    return {
      row: { backgroundColor: theme.palette.dark },
      cell: {
        border: `1px solid ${theme.palette.dark}`,
        verticalAlign: "top",
        padding: 2,
      },
      head: {
        borderLeft: `1px solid ${theme.palette.secondary.default}`,
        borderTop: `1px solid ${theme.palette.secondary.default}`,
        color: theme.palette.success.contrastText,
        verticalAlign: "top",
        padding: 2,
        fontWeight: "bold",
      },
    };
  }, [variant, theme]);
 

