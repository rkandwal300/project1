import React, { useState } from "react";
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
import TablePagination from "./TablePagination";
import ActionBlock from "./table_components/ActionBlock";
import { useTableStyles } from "@/hooks/useTableStyles";
import CustomTableHeader from "./table_components/CustomTableHeader";
import CustomTableBody from "./table_components/CustomTableBody";

const CustomTable = ({
  data,
  columns,
  variant = "default",
  isPagination = false,
  onDelete,
}) => {
  const theme = useTheme();
  const styles = useTableStyles(variant, theme);

  const [grouping, setGrouping] = useState([]);
  const [editingCell, setEditingCell] = useState({
    rowIndex: null,
    columnId: null,
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    state: { grouping, pagination },
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
    debugTable: false,
    manualGrouping: true,
    enableRowSelection: true,
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: 3, borderRadius: "0  0 10px  10px" }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table
          size="small"
          sx={{ tableLayout: "fixed", minWidth: "max-content" }}
        >
          <CustomTableHeader
            headerGroups={table.getHeaderGroups()}
            styles={styles}
          />
          <CustomTableBody
            rows={table.getRowModel().rows}
            styles={styles}
            variant={variant}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            getAllColumns={table.getAllColumns}
            getTotalSize={table.getTotalSize}
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
};

export default CustomTable;
