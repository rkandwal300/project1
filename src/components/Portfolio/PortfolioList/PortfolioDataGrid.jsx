import { DataGrid } from "src/components/template/index.js";
import { useNavigate } from "react-router";
import { PortfolioDataGridColumns } from "./PortfolioDataGridColumns";

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

export default function PortfolioDataGrid() {
  const navigate = useNavigate();

  const handleRowDoubleClick = (params) => {
    try {
      const url = `/portfolio/${params.id}`;
      navigate(url, { replace: true });
    } catch (e) {
      console.error("Failed to handle row double click:", e);
    }
  };

  return (
    <DataGrid
      rows={rows}
      columns={PortfolioDataGridColumns}
      pageSize={10}
      rowsPerPageOptions={[10, 25, 50]}
      disableSelectionOnClick
      onRowDoubleClick={handleRowDoubleClick}
      hideFooter
      autoHeight
      getRowHeight={() => "auto"}
      // disableColumnResize={false}
      sx={{
        border: "none",
        minWidth: 1110,
        "& .MuiDataGrid-root": {
          border: "none",
          bgcolor: "16px",
        },
        "& .MuiDataGrid-columnHeaders": {
          display: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          overflow: "visible !important",
          marginTop: "0 !important",
        },
        "& .MuiDataGrid-virtualScrollerContent": {
          paddingBottom: `${rows.length * 8}px`,
          boxSizing: "content-box",
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
