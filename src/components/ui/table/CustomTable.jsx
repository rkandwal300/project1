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
} from "@mui/material";

export function CustomTable({
  data,
  columns,
  variant = "default",
  bordered = true,
  //   noDataText = "No data available",
}) {
  const themeColor = useTheme();
  const [grouping, setGrouping] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    manualGrouping: true,
  });

  let cellStyle = {};
  let TableHeadStyle = {};
  let tableRowStyle = {};
  if (variant === "default") {
    tableRowStyle = { backgroundColor: "#000" };
    cellStyle = {
      border: "1px solid rgba(0, 0, 0, 0.3)",
      verticalAlign: "top",
      padding: 2,
    };
    TableHeadStyle = {
      //   BorderRight: themeColor.palette.primary,
      borderLeft: "1px solid #d7d7d7",
      borderTop: "1px solid #d7d7d7",
      verticalAlign: "top",
      padding: 2,
      color: "#fff",
      fontWeight: "bold",
    };
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table size="small">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} sx={tableRowStyle}>
              {headerGroup.headers.map((header) => {
                const colSpan = header.colSpan;

                return (
                  <TableCell
                    key={header.id}
                    sx={TableHeadStyle}
                    align="left"
                    colSpan={colSpan > 1 ? colSpan : undefined}
                    rowSpan={colSpan === 1 ? 2 : undefined}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        {/* 
        <TableHead>
  {table.getHeaderGroups().map((headerGroup) => (
    <TableRow key={headerGroup.id} sx={tableRowStyle}>
      {headerGroup.headers.map((header) => {
        const isLeaf = !header.subHeaders?.length;
        const colSpan = header.colSpan;

        return (
          <TableCell
            key={header.id}
            sx={TableHeadStyle}
            align="left"
            colSpan={colSpan > 1 ? colSpan : undefined}
            rowSpan={isLeaf && colSpan === 1 ? 2 : undefined}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  ))}
</TableHead> */}
        {/* <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} sx={tableRowStyle}>
              {headerGroup.headers.map((header) => {
                const isLeaf = !header.subHeaders?.length;
                const colSpan = header.colSpan;

                return (
                  <TableCell
                    key={header.id}
                    sx={TableHeadStyle}
                    align="left"
                    colSpan={colSpan > 1 ? colSpan : undefined}
                    rowSpan={isLeaf && colSpan === 1 ? 2 : undefined}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead> */}

        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} sx={cellStyle}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                  {/* {noDataText} */}
                  No Data Available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
