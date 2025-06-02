import React from "react";
import PropTypes from "prop-types";
import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import CustomTableRow from "./CustomTableRow";

const CustomTableBody = ({
  rows,
  styles,
  variant,
  editingCell,
  setEditingCell,
  getAllColumns,
  getTotalSize,
}) => {
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
            colSpan={getAllColumns().length}
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
    <TableBody>
      {rows.map((row) => (
        <CustomTableRow
          key={row.id}
          row={row}
          styles={styles}
          variant={variant}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
        />
      ))}
    </TableBody>
  );
};

CustomTableBody.propTypes = {
  rows: PropTypes.array.isRequired,
  styles: PropTypes.object,
  variant: PropTypes.string,
  editingCell: PropTypes.any,
  setEditingCell: PropTypes.func,
  getAllColumns: PropTypes.func.isRequired,
  getTotalSize: PropTypes.func.isRequired,
};

export default CustomTableBody;
