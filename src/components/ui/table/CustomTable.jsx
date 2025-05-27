import * as React from "react";
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
import PropTypes from "prop-types";
import TablePagination from "./TablePagination";
export function CustomTable({
  data,
  columns,
  variant = "default",
  isPagination = false,
}) {
  const theme = useTheme();
  const [grouping, setGrouping] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
      pagination,
    },
    onPaginationChange: setPagination,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    manualGrouping: true,
    enableRowSelection: true,
  });

  let cellStyle = {};
  let TableHeadStyle = {};
  let tableRowStyle = {};
  if (variant === "default") {
    tableRowStyle = { backgroundColor: theme.palette.dark };
    cellStyle = {
      border: `1px solid ${theme.palette.dark}`,
      verticalAlign: "top",
      padding: 2,
    };
    TableHeadStyle = {
      borderLeft: `1px solid ${theme.palette.secondary.default}`,
      borderTop: `1px solid ${theme.palette.secondary.default}`,
      color: theme.palette.success.contrastText,
      verticalAlign: "top",
      padding: 2,
      fontWeight: "bold",
    };
  }

  if (variant === "primary") {
    tableRowStyle = {
      backgroundColor: theme.palette.dark,
    };
    cellStyle = {
      color: theme.palette.success.contrastText,
      backgroundColor: theme.palette.grey[700],
      verticalAlign: "top",
      borderBottom: `1px solid ${theme.palette.secondary.default}`,
      padding: 2,
    };
    TableHeadStyle = {
      verticalAlign: "top",
      padding: 2,
      color: "#299bff",
      borderBottom: "none",
      fontWeight: "bold",
    };
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: "auto" ,overflowY: "hidden" }}>
      <Box sx={{ minWidth: "max-content" }}>
        
        <Table size="small" sx={{ position: "relative" }}>
          <TableHead sx={{ stickyHeader: true }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} sx={tableRowStyle}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    sx={TableHeadStyle}
                    align="left"
                    key={header.id}
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

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} sx={cellStyle}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
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
        {isPagination && <TablePagination table={table} />}
    </TableContainer>
  );
}

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  variant: PropTypes.string,
  isPagination: PropTypes.bool,
};
