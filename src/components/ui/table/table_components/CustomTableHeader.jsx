import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { flexRender } from "@tanstack/react-table";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { getCommonPinningStyles } from "@/hooks/useTableStyles";
import { useTheme } from "@emotion/react";

const getCellStyleUtil = ({
  header,
  lastColumnIds,
  variant,
  borderColor,
  isMultiHeader,
  isTopParentHeader,
}) => {
  const size =
    header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize();

  let columnStyles = getCommonPinningStyles(header.column);

  if (header.column.getIsPinned()) {
    columnStyles = {
      ...columnStyles,
      left: header.getStart(),
    };
  }

  const shouldAddRightBorder =
    isTopParentHeader &&
    isMultiHeader &&
    variant === "primaryBorder" &&
    !header.column.getIsPinned();

  let cellStyle = {
    ...columnStyles,
    width: `${size}px`,
    minWidth: `${size}px`,
    maxWidth: `${size}px`,
    borderRight:
      lastColumnIds.has(header.column.id) &&
      variant === "primaryBorder" &&
      !header.column.getIsPinned()
        ? `1px solid ${borderColor}`
        : undefined,
  };

  if (shouldAddRightBorder) {
    cellStyle = {
      ...cellStyle,
      borderRight: `1px solid ${borderColor}`,
    };
  }

  return cellStyle;
};

const CustomTableHeader = ({
  headerGroups,
  styles = {},
  variant,
  lastColumnIds,
}) => {
  const theme = useTheme();

  const borderColor = useMemo(
    () => theme.palette?.secondary?.default,
    [theme.palette?.secondary?.default]
  );

  const getCellStyle = useCallback(
    (header, isMultiHeader, isTopParentHeader) =>
      getCellStyleUtil({
        header,
        lastColumnIds,
        variant,
        borderColor,
        isMultiHeader,
        isTopParentHeader,
      }),
    [lastColumnIds, variant, borderColor]
  );

  return (
    <TableHead>
      {headerGroups.map((headerGroup) => {
        const isMultiHeader = headerGroups.length > 1;
        return (
          <TableRow key={headerGroup.id} sx={styles.row}>
            {headerGroup.headers.map((header) => {
              if (header.isPlaceholder) return null;

              const align = header.column.columnDef.meta?.align || "left";
              const isTopParentHeader = header.depth === 1;
              const headerStyle = getCellStyle(
                header,
                isMultiHeader,
                isTopParentHeader
              );
              return (
                <TableCell
                  key={header.id}
                  sx={{ ...styles.head,...headerStyle, py: "3px" }}
                  align={align}
                  colSpan={header.colSpan} 
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableHead>
  );
};

CustomTableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  styles: PropTypes.object,
  lastColumnIds: PropTypes.instanceOf(Set).isRequired,
  variant: PropTypes.string.isRequired,
};

export default memo(CustomTableHeader);
