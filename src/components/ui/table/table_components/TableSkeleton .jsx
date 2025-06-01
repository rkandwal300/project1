import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Table>
    <TableHead>
      <TableRow>
        {Array.from({ length: columns }).map((_, i) => (
          <TableCell key={i}>
            <Skeleton variant="text" width={100} />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton variant="text" width="80%" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
export default TableSkeleton;
