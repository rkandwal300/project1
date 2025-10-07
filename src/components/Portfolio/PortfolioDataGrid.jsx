import awsLogo from "../../assets/logos/providers/awslogo.svg";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Avatar, IconButton } from "@mui/material";
import { Edit, Delete, AttachMoney, Lock } from "@mui/icons-material";

const rows = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  provider: "aws",
  portfolioName: "Portfolio Name",
  instanceName: `AWS-Test ${index + 1}`,
  instances: Math.floor(Math.random() * 50) + 1,
  createdAt: "Jan/21/2025 21:00",
  createdBy: "Sam Anderson",
  createdFor: "Sam Anderson",
}));

const columns = [
  {
    field: "portfolioName",
    headerName: "Portfolio Name",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          sx={{
            width: 42,
            height: 42,
            backgroundColor: "#fff",
            border: "2px solid #ff9900",
          }}
          src={awsLogo}
          alt="AWS"
        >
          <Box
            component="span"
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              color: "#232f3e",
            }}
          >
            aws
          </Box>
        </Avatar>
        <Box>
          <Box
            sx={{ color: "#fff", fontSize: "14px", fontWeight: 400, mb: 0.3 }}
          >
            Portfolio Name
          </Box>
          <Box sx={{ color: "#1e88e5", fontSize: "14px", fontWeight: 500 }}>
            {params.value}
          </Box>
        </Box>
      </Box>
    ),
  },
  {
    field: "instances",
    headerName: "No. of Instance",
    flex: 0.6,
    minWidth: 150,
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "#fff", fontSize: "13px", mb: 0.3 }}>
          No. of Instance
        </Box>
        <Box sx={{ color: "#1e88e5", fontSize: "14px", fontWeight: 500 }}>
          {params.value}
        </Box>
      </Box>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 0.8,
    minWidth: 180,
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "#fff", fontSize: "13px", mb: 0.3 }}>Created At</Box>
        <Box sx={{ color: "#999", fontSize: "14px" }}>{params.value}</Box>
      </Box>
    ),
  },
  {
    field: "createdBy",
    headerName: "Created by",
    flex: 0.7,
    minWidth: 150,
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "#fff", fontSize: "13px", mb: 0.3 }}>Created by</Box>
        <Box sx={{ color: "#999", fontSize: "14px" }}>{params.value}</Box>
      </Box>
    ),
  },
  {
    field: "createdFor",
    headerName: "Created for",
    flex: 0.7,
    minWidth: 150,
    renderCell: (params) => (
      <Box>
        <Box sx={{ color: "#fff", fontSize: "13px", mb: 0.3 }}>Created for</Box>
        <Box sx={{ color: "#999", fontSize: "14px" }}>{params.value}</Box>
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.6,
    minWidth: 180,
    sortable: false,
    renderCell: () => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          size="small"
          sx={{
            color: "#fff",
            "&:hover": {
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: "#fff",
            "&:hover": {
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: "#fff",
            "&:hover": {
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <AttachMoney fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: "#fff",
            "&:hover": {
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Lock fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
];

export default function PortfolioDataGrid() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10, 25, 50]}
      disableSelectionOnClick
      hideFooter
      autoHeight
      getRowHeight={() => "auto"}
      sx={{
        border: "none",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          display: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          overflow: "visible !important",
          marginTop: "0 !important",
        },
        "& .MuiDataGrid-row": {
          backgroundColor: "secondary.main",
          marginBottom: "8px",
          borderRadius: "8px",
          minHeight: "76px !important",
          maxHeight: "none !important",
          "&:hover": {
            backgroundColor: "#353738",
          },
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          border: "none",
          display: "flex",
          alignItems: "center",
          padding: "16px",
          minHeight: "76px !important",
          maxHeight: "none !important",
          "&:focus": {
            outline: "none",
          },
          "&:focus-within": {
            outline: "none",
          },
        },
        "& .MuiDataGrid-cellContent": {
          width: "100%",
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-footerContainer": {
          display: "none",
        },
        "& .MuiDataGrid-row:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-row.Mui-selected": {
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "#353738",
          },
        },
        backgroundColor: "transparent",
      }}
    />
  );
}
