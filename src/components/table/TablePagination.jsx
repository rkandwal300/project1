import {
  IconButton,
  Select,
  MenuItem,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import PropTypes from "prop-types";

export default function TablePagination({ table }) {
  const {
    getCanPreviousPage,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
    getPageCount,
    getState,
  } = table;
  const theme = useTheme();
  const { pagination } = getState();
  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;
  const total = table.getFilteredRowModel().rows.length;

  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, total);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      p={2}
      gap={2}
      sx={{
        bgcolor: theme.palette.grey[700],
        color: theme.palette.success.contrastText,
      }}
    >
      <Typography>Items per page:</Typography>
      <Select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        size="small"
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          PaperProps: {
            sx: {
              bgcolor: theme.palette.grey[700],
              color: theme.palette.success.contrastText,
            },
          }, 
        }}
        sx={{
          minWidth: 80,
          color: theme.palette.success.contrastText,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.success.contrastText,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.success.contrastText, 
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.success.contrastText,
          },
          "& .MuiSelect-icon": {
            color: theme.palette.success.contrastText,
          },
        }}
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <MenuItem
            key={size}
            value={size}
            sx={{
              color: theme.palette.success.contrastText,
              bgcolor: theme.palette.grey[700],
              '&:hover': {
                backgroundColor: theme.palette.grey[600],
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.grey[600],
              },
            }}
          >
            {size}
          </MenuItem>
        ))}
      </Select>

      <Typography>
        {start}-{end} of {total}
      </Typography>

      <IconButton
        onClick={() => setPageIndex(0)}
        disabled={!getCanPreviousPage()}
        size="small"
        sx={{
          color: theme.palette.grey[500],
          '&:disabled': {
            color: theme.palette.grey[500],
          },
        }}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={previousPage}
        disabled={!getCanPreviousPage()}
        size="small"
        sx={{
          color: theme.palette.grey[500],
          '&:disabled': {
            color: theme.palette.grey[500],
          },
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={nextPage}
        disabled={!getCanNextPage()}
        size="small"
        sx={{
          color: theme.palette.grey[500],
          '&:disabled': {
            color: theme.palette.grey[500],
          },
        }}
      >
        <ChevronRight />
      </IconButton>
      <IconButton
        onClick={() => setPageIndex(getPageCount() - 1)}
        disabled={!getCanNextPage()}
        size="small"
        sx={{
          color: theme.palette.grey[500],
          '&:disabled': {
            color: theme.palette.grey[500],
          },
        }}
      >
        <LastPage />
      </IconButton>
    </Box>
  );
}

TablePagination.propTypes = {
  table: PropTypes.object.isRequired,
};
