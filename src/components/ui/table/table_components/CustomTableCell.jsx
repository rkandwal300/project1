import { getCommonPinningStyles } from "@/hooks/useTableStyles";
import { TableCell } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import PropTypes from "prop-types";

const CustomTableCell = ({
  cell,
  styles,
  variant,
  isEditing,
  onDoubleClick,
}) => (
  <TableCell
  id={`tableCell${cell.id}`}
    sx={{
      py: isEditing ? 0 : "3px",
      minHeight: "69px",
      alignItems: "center",
      verticalAlign: variant === "default" ? "top" : "middle",
      width: cell.column.getSize(),
      minWidth: cell.column.getSize(),
      maxWidth: cell.column.getSize(),
      ...getCommonPinningStyles(cell.column),
    }}
    style={{
      ...styles.cell,
      borderRight: cell.column.getIsPinned()
        ? undefined
        : styles.cell?.borderRight,
    }}
    onDoubleClick={onDoubleClick}
  >
    {flexRender(cell.column.columnDef.cell, {
      ...cell.getContext(),
      isEditing,
    })}
  </TableCell>
);

CustomTableCell.propTypes = {
  cell: PropTypes.object.isRequired,
  styles: PropTypes.object,
  variant: PropTypes.string,
  isEditing: PropTypes.bool,
  onDoubleClick: PropTypes.func,
};

export default CustomTableCell;
