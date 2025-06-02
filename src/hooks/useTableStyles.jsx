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
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  let boxShadow;
  if (isLastLeftPinnedColumn) {
    boxShadow = "-1px 0 0 0 #aba7a7 inset";
  } else if (isFirstRightPinnedColumn) {
    boxShadow = "1px 0 0 0 #aba7a7 inset";
  } else {
    boxShadow = undefined;
  }

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 1 : 1,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
    width: column.columnDef?.size,
    minWidth: column.columnDef?.minSize,
    maxWidth: column.columnDef?.maxSize,
    boxShadow,
  };
};
