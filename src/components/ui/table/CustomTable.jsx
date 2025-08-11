import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableContainer,
  Paper,
  useTheme,
  Box,
} from "@mui/material";

import TablePagination from "./TablePagination";
import ActionBlock from "./table_components/ActionBlock";
import CustomTableHeader from "./table_components/CustomTableHeader";
import CustomTableBody from "./table_components/CustomTableBody";
import { useTableStyles } from "@/hooks/useTableStyles";

const CustomTable = ({
  data,
  columns,
  variant = "default",
  isPagination = false,
  onDelete,
  defaultColumnPinningState = { left: [], right: [] },
  id = "custom-table",
  sx = {},
  columnVisibility = {},
}) => {
  const theme = useTheme();
  const styles = useTableStyles(variant, theme);

  /** -----------------------
   * State Management
   ------------------------*/
  const [grouping, setGrouping] = useState([]);
  const [editingCell, setEditingCell] = useState({ rowIndex: null, columnId: null });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnPinning, setColumnPinning] = useState(defaultColumnPinningState);
  const [columnVisibilityState, setColumnVisibilityState] = useState(columnVisibility);

  /** -----------------------
   * Memoized Table Instance
   ------------------------*/
  const table = useReactTable({
    data,
    columns,
    state: { grouping, pagination, columnPinning, columnVisibility: columnVisibilityState },
    meta: { editingCell, setEditingCell },
    onColumnVisibilityChange: setColumnVisibilityState,
    onPaginationChange: setPagination,
    onGroupingChange: setGrouping,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnPinning: true,
    manualGrouping: true,
    enableRowSelection: true,
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    debugTable: false,
  });

  /** -----------------------
   * Derived Data
   ------------------------*/
  const lastColumnIds = useMemo(() => {
    const ids = new Set();
    table.getHeaderGroups().forEach((headerGroup) => {
      headerGroup.headers.forEach((header) => {
        if (header.subHeaders?.length > 0) {
          const leafs = header.subHeaders.flatMap((sub) => sub.column.getLeafColumns());
          const lastLeaf = leafs[leafs.length - 1];
          if (lastLeaf) ids.add(lastLeaf.id);
        }
      });
    });
    return ids;
  }, [table.getHeaderGroups()]);

  /** -----------------------
   * Effects
   ------------------------*/
  useEffect(() => {
    setColumnVisibilityState(columnVisibility);
  }, [columnVisibility]);

  /** -----------------------
   * Render
   ------------------------*/
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, ...sx }}>
      <Box sx={{ overflowX: "auto" }} id={id} role="table-container">
        <Table size="small" sx={{ tableLayout: "fixed", minWidth: "max-content" }}>
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

/** -----------------------
 * PropTypes
 ------------------------*/
CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  variant: PropTypes.string,
  isPagination: PropTypes.bool,
  onDelete: PropTypes.func,
  id: PropTypes.string,
  sx: PropTypes.object,
  columnVisibility: PropTypes.object,
  defaultColumnPinningState: PropTypes.shape({
    left: PropTypes.arrayOf(PropTypes.string),
    right: PropTypes.arrayOf(PropTypes.string),
  }),
};

/** -----------------------
 * Default Props
 ------------------------*/
CustomTable.defaultProps = {
  variant: "default",
  isPagination: false,
  sx: {},
  columnVisibility: {},
  defaultColumnPinningState: { left: [], right: [] },
};

export default CustomTable;
