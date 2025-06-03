import { TableRow } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import CustomTableCell from "./CustomTableCell";
import { useTheme } from "@emotion/react";
import ConsumptionMetadata from "@/components/shared/Form/Consumption Metadata/ConsumptionMetadata";

const CustomTableRow = ({
  row,
  styles,
  variant,
  editingCell,
  setEditingCell,
  lastColumnIds,
}) => {
  const theme = useTheme();  
  return (
    <TableRow key={row.id}  sx={styles.bodyRow}>
      {row.getVisibleCells().map((cell) => {
        const isEditing =
          editingCell?.rowIndex === row.index &&
        editingCell?.columnId === cell.column.id;
         return (
          <CustomTableCell
            key={cell.id}
            cell={cell}
            styles={{
              ...styles,
             cell:{
              ...styles.cell,
               borderRight:
                lastColumnIds.has(cell.column.id) && variant === "primaryBorder"
                  ? `1px solid ${theme.palette.secondary.default}`
                  : "0px",
             }
            }}
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
  );
};

CustomTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  styles: PropTypes.object,
  variant: PropTypes.string,
  editingCell: PropTypes.shape({
    rowIndex: PropTypes.number,
    columnId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  setEditingCell: PropTypes.func.isRequired,
  lastColumnIds: PropTypes.instanceOf(Set).isRequired,
};

CustomTableRow.displayName = "CustomTableRow";
export default CustomTableRow;
