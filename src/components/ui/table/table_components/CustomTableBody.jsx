import React from "react";
import PropTypes from "prop-types";
import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import CustomTableRow from "./CustomTableRow";

const CustomTableBody = ({
  table,
  styles,
  variant,
  editingCell,
  setEditingCell,
  getAllColumns,
  getTotalSize,
  lastColumnIds,
}) => {
  const rows = table.getRowModel().rows;
  const length = table.getHeaderGroups().length - 1;
  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            sx={{
              ...styles.cell,
              minWidth: `${getTotalSize()}px`,
              maxWidth: `${getTotalSize()}px`,
              width: `${getTotalSize()}px`,
              p: 2,
            }}
            colSpan={table.getHeaderGroups()[length].headers.length}
          >
            <Typography align="center" variant="body2" color="textSecondary">
              No Data Available
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody sx={variant === "default" ? { overflowY: "auto" } : {}}>
      {rows.map((row) => (
        <CustomTableRow
          key={row.id}
          row={row}
          styles={styles}
          variant={variant}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          lastColumnIds={lastColumnIds}
          colSpan={getAllColumns().length}
        />
      ))}
    </TableBody>
  );
};

CustomTableBody.propTypes = {
  table: PropTypes.object.isRequired,
  styles: PropTypes.object,
  variant: PropTypes.string,
  editingCell: PropTypes.any,
  setEditingCell: PropTypes.func,
  getAllColumns: PropTypes.func.isRequired,
  getTotalSize: PropTypes.func.isRequired,
  lastColumnIds: PropTypes.instanceOf(Set).isRequired,
};

export default CustomTableBody;
