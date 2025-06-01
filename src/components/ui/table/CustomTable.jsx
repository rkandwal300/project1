import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import TablePagination from "./TablePagination";
import ActionBlock from "./table_components/ActionBlock";

const useTableStyles = (variant, theme) =>
  useMemo(() => {
    if (variant === "primary") {
      return {
        row: { backgroundColor: theme.palette.dark },
        cell: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.grey[700],
          verticalAlign: "top",
          borderBottom: `1px solid ${theme.palette.secondary.default}`,
          padding: 2,
        },
        head: {
          verticalAlign: "top",
          padding: 2,
          color: "#299bff",
          borderBottom: "none",
          fontWeight: "bold",
        },
      };
    }
    // Default variant
    return {
      row: { backgroundColor: theme.palette.dark },
      cell: {
        border: `1px solid ${theme.palette.dark}`,
        verticalAlign: "top",
        padding: 2,
      },
      head: {
        borderLeft: `1px solid ${theme.palette.secondary.default}`,
        borderTop: `1px solid ${theme.palette.secondary.default}`,
        color: theme.palette.success.contrastText,
        verticalAlign: "top",
        padding: 2,
        fontWeight: "bold",
      },
    };
  }, [variant, theme]);

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
  });

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius:0, overflowX: "auto" }}>
      <Box sx={{ minWidth: "max-content" }}>
        {/* Table Head */}
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} sx={styles.row}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{ ...styles.head, py: "3px" }}
                    align="left"
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
        </Table>
        {/* Table Body */}
        <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
          <Table size="small">
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const isEditing =
                        table.options.meta.editingCell?.rowIndex ===
                          row.index &&
                        table.options.meta.editingCell?.columnId ===
                          cell.column.id;
                      return (
                        <TableCell
                          key={cell.id}
                          sx={{
                            ...styles.cell,
                            py:          isEditing ? 0 : "3px",
                            minHeight: "69px",
                            alignItems: "center",
                            verticalAlign: "middle",
                          }}
                          onDoubleClick={() =>
                            table.options.meta.setEditingCell({
                              rowIndex: row.index,
                              columnId: cell.column.id,
                            })
                          }
                        >
                          {flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            isEditing,
                          })}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={styles.cell} colSpan={columns.length}>
                    <Typography
                      align="center"
                      variant="body2"
                      color="textSecondary"
                    >
                      No Data Available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
      {/* Optional Pagination and Actions */}
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
