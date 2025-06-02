import { TableCell } from "@mui/material";
import { flexRender } from "@tanstack/react-table"; 

 
const CustomTableCell =  
  ({ cell, styles, variant, isEditing, onDoubleClick }) => (
    <TableCell
      sx={{
        ...styles.cell,
        py: isEditing ? 0 : "3px",
        minHeight: "69px",
        alignItems: "center",
        verticalAlign: variant === "default" ? "top" : "middle",
        width: cell.column.getSize(),
        minWidth: cell.column.getSize(),
        maxWidth: cell.column.getSize(),
      }}
      onDoubleClick={onDoubleClick}
    >
      {flexRender(cell.column.columnDef.cell, {
        ...cell.getContext(),
        isEditing,
      })}
    </TableCell>
  );
export default CustomTableCell;