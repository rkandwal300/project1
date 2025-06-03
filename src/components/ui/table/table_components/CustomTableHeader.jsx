import React from "react";
import PropTypes from "prop-types";
import { flexRender } from "@tanstack/react-table";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { getCommonPinningStyles } from "@/hooks/useTableStyles";
import { useTheme } from "@emotion/react";

const CustomTableHeader = ({
  headerGroups,
  styles,
  variant,
  lastColumnIds,
}) => {
  const theme = useTheme();

  return (
    <TableHead>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id} sx={styles.row}>
          {headerGroup.headers.map((header) => {
            if (header.isPlaceholder) return null;

            let size;
            if (header.getSize() === Number.MAX_SAFE_INTEGER) {
              size = "auto";
            } else {
              size = header.getSize();
            }
            // NEW: compute width of pinned header groups
            // if (header.subHeaders?.length && header.column?.getIsPinned?.()) {
            //   const pinnedSubHeaders = header.subHeaders.filter((sub) =>
            //     sub.column.getIsPinned()
            //   );
            //   size = pinnedSubHeaders.reduce(
            //     (acc, sub) => acc + sub.getSize(),
            //     0
            //   );
            // }
            // if (header.subHeaders?.length && header.column?.getIsPinned?.()) {
            //   const pinnedSubHeaders = header.subHeaders.filter((sub) =>
            //     sub.column.getIsPinned()
            //   );

            //   size = pinnedSubHeaders.reduce(
            //     (acc, sub) => acc + sub.getSize(),
            //     0
            //   );
            // } else {
              size =
                header.getSize() === Number.MAX_SAFE_INTEGER
                  ? "auto"
                  : header.getSize();
            // }
            console.log({ left: header.getStart(), size, header: header.column.columnDef.header });
            return (
              <TableCell
                key={header.id}
                sx={{ ...styles.head, py: "3px" }}
                align="left"
                colSpan={header.colSpan}
                style={{
                  ...getCommonPinningStyles(header.column),
                  // left: header.getStart()
                  width: size,
                  minWidth: size,
                  maxWidth: size,
                  borderRight:
                    lastColumnIds.has(header.column.id) &&
                    variant === "primaryBorder"
                      ? `1px solid ${theme.palette.secondary.default}`
                      : undefined,
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
};

CustomTableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  styles: PropTypes.object,
  lastColumnIds: PropTypes.instanceOf(Set).isRequired,
  variant: PropTypes.string.isRequired,
};

export default CustomTableHeader;
