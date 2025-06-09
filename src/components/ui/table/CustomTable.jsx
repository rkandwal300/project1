import React, { useState,lazy } from "react";
import PropTypes from "prop-types";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableContainer, Paper, useTheme, Box } from "@mui/material";  
import { useTableStyles } from "@/hooks/useTableStyles";  

// Lazy load heavy components
const TablePagination = lazy(() => import("./TablePagination"));
const ActionBlock = lazy(() => import("./table_components/ActionBlock"));
const CustomTableHeader = lazy(() => import("./table_components/CustomTableHeader"));
const CustomTableBody = lazy(() => import("./table_components/CustomTableBody"));

const CustomTable = ({
  data,
  columns,
  variant = "default",
  isPagination = false,
  onDelete,
  defaultColumnPinningState,
  id="custom-table",
}) => {
  const theme = useTheme();
  const styles = useTableStyles(variant, theme);

  const [grouping, setGrouping] = useState([]);
  const [editingCell, setEditingCell] = useState({
    rowIndex: null,
    columnId: null,
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnPinning, setColumnPinning] = useState(
    defaultColumnPinningState ?? {
      left: [],
      right: [],
    }
  );

  const table = useReactTable({
    data,
    columns,
    state: { grouping, pagination, columnPinning },
    meta: {
      editingCell,
      setEditingCell,
    },
    onPaginationChange: setPagination,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnPinningChange: setColumnPinning,
    getHeaderGroups: getCoreRowModel(),
    
    enableColumnPinning: true,
    debugTable: false,
    manualGrouping: true,
    enableRowSelection: true,
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });
 const lastColumnIds = new Set();
  table.getHeaderGroups().forEach((headerGroup) => {
    headerGroup.headers.forEach((header) => {
      if (header.subHeaders?.length > 0) {
        const leafs = header.subHeaders.flatMap((sub) =>
          sub.column.getLeafColumns()
        );
        const lastLeaf = leafs[leafs.length - 1];
        if (lastLeaf) {
          lastColumnIds.add(lastLeaf.id);
        }
      }
    });
  });
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: 3, }}
    >
      <Box sx={{ overflowX: "auto" }} id={id} role="table-container">
        <Table
          size="small"
          sx={{ tableLayout: "fixed", minWidth: "max-content" }}
        >
          <CustomTableHeader
            headerGroups={table.getHeaderGroups()}
            styles={styles}
            variant={variant}
            lastColumnIds={lastColumnIds}
          />
          <CustomTableBody
           table={table}
            styles={styles}
            variant={variant}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            getAllColumns={table.getAllColumns}
            getTotalSize={table.getTotalSize}
            lastColumnIds={lastColumnIds}
          />
        </Table>
      </Box>
      {isPagination && <TablePagination table={table} />}
      {onDelete && <ActionBlock table={table} onDelete={onDelete} />}
    </TableContainer>
  );
};

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  variant: PropTypes.string,
  isPagination: PropTypes.bool,
  onDelete: PropTypes.func,
  id: PropTypes.string,
  defaultColumnPinningState: PropTypes.shape({
    left: PropTypes.arrayOf(PropTypes.string),
    right: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default CustomTable;
