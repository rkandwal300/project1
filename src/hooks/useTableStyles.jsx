import { useMemo } from "react";

export const useTableStyles = (variant, theme) =>
  useMemo(() => {
    if (variant === "primary") {
      return {
        row: { backgroundColor: theme.palette.dark },
        cell: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.grey[700],
          verticalAlign: "middle",
          borderBottom: "1px solid",
          borderColor: theme.palette.secondary.default,
        },
        head: {
          verticalAlign: "top",
          padding: 2,
          color: "#299bff",
          borderBottom: "none",
          fontWeight: "bold",
          backgroundColor: theme.palette.dark,
        },
      };
    }
    if (variant === "provider") {
      const borderColor = theme.palette.grey[400];
      return {
        bodyRow: { backgroundColor: theme.palette.grey[700] },
        cell: {
          color: theme.palette.grey[700],
          backgroundColor: theme.palette.primary.contrastText,
          padding: 0,
          verticalAlign: "top",
          alignItems: "center",
          border: "0px",
          borderBottom: "none",
          height: "40px",
          fontSize: "13px",
          borderLeft: "1px solid",
          borderColor: borderColor,
        },
        head: {
          alignItems: "stretch",
          verticalAlign: "center",
          padding: 1,
          height: "45px",
          color: theme.palette.dark,
          fontWeight: 600,
          fontSize: "15px",
          backgroundColor: theme.palette.primary.contrastText,
          borderLeft: `1px solid`,
          borderBottom: `1px solid`,
          borderColor: borderColor,
        },
      };
    }
    if (variant === "primaryBorder") {
      return {
        row: { backgroundColor: theme.palette.dark },
        bodyRow: { backgroundColor: theme.palette.grey[700] },
        cell: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.grey[700],
          verticalAlign: "top",
          alignItems: "center",
          border: "0px",
          borderBottom: `1px solid ${theme.palette.secondary.default}`,
          padding: " 10px",
          height: "60px",
        },
        head: {
          alignItems: "stretch",
          verticalAlign: "top",
          padding: 2,
          color: "#299bff",
          borderBottom: "none",
          fontWeight: "bold",
          backgroundColor: theme.palette.dark,
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

export const getCommonPinningStyles = (column) => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 1 : 1,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
    width: column.columnDef?.size,
    minWidth: column.columnDef?.minSize,
    maxWidth: column.columnDef?.maxSize,
  };
};
