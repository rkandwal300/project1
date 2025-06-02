import React from "react";
import PropTypes from "prop-types";
import { flexRender } from "@tanstack/react-table";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { getCommonPinningStyles } from "@/hooks/useTableStyles";

const CustomTableHeader = ({ headerGroups, styles }) => (
  <TableHead>
    {headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id} sx={styles.row}>
        {headerGroup.headers.map((header) => (
          <TableCell
            key={header.id}
            sx={{ ...styles.head, py: "3px" }}
            align="left"
            colSpan={header.colSpan}
            style={{
                ...getCommonPinningStyles(header.column),
              width: header.getSize(),
              minWidth: header.getSize(),
              maxWidth: header.getSize(),
            }}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
);

CustomTableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  styles: PropTypes.object,
};

export default CustomTableHeader;
