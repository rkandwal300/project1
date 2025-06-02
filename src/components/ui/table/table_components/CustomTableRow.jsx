import { TableRow } from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';
import CustomTableCell from './CustomTableCell';

const CustomTableRow =  
  ({ row, styles, variant, editingCell, setEditingCell }) => (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const isEditing =
          editingCell?.rowIndex === row.index &&
          editingCell?.columnId === cell.column.id;
        return (
          <CustomTableCell
            key={cell.id}
            cell={cell}
            styles={styles}
            variant={variant}
            isEditing={isEditing}
            onDoubleClick={() =>
              setEditingCell({
                rowIndex: row.index,
                columnId: cell.column.id,
              })
            }
          />
        );
      })}
    </TableRow>
  )
 
CustomTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  styles: PropTypes.object,
  variant: PropTypes.string,
  editingCell: PropTypes.shape({
    rowIndex: PropTypes.number,
    columnId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setEditingCell: PropTypes.func.isRequired,
};
CustomTableRow.displayName = 'CustomTableRow';
export default CustomTableRow