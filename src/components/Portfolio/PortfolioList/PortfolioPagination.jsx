import React, { useState } from "react";
import { Box, Typography, IconButton, Pagination, Chip } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function PortfolioPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPortfolios = 200;
  const itemsPerPage = 47;
  const totalPages = Math.ceil(totalPortfolios / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStartItem = () => {
    return (currentPage - 1) * itemsPerPage + 1;
  };

  const getEndItem = () => {
    const end = currentPage * itemsPerPage;
    return end > totalPortfolios ? totalPortfolios : end;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "secondary.main",
        border: "2px solid",
        borderColor: "secondary.contrastText",
        padding: "12px 20px",
        borderRadius: "4px",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            color: "primary.contrastText",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          Total Portfolios :
        </Typography>
        <Typography
          sx={{
            color: "primary.contrastText",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            backgroundColor: "secondary.main",
            border: "2px solid",
            borderColor: "secondary.contrastText",
          }}
        >
          {totalPortfolios}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton
            onClick={handlePrevious}
            disabled={currentPage === 1}
            sx={{
              color:
                currentPage === 1
                  ? "secondary.contrastText"
                  : "secondary.default",
              padding: "4px",
              "&:hover": {
                backgroundColor: "secondary.contrastText",
              },
              "&.Mui-disabled": {
                color: "secondary.contrastText",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography
            sx={{
              color:
                currentPage === 1
                  ? "secondary.contrastText"
                  : "secondary.default",
              fontSize: "14px",
              cursor: currentPage === 1 ? "default" : "pointer",
              userSelect: "none",
              "&:hover":
                currentPage === 1
                  ? {}
                  : {
                      color: "primary.contrastText",
                    },
            }}
            onClick={handlePrevious}
          >
            Previous
          </Typography>
        </Box>

        {/* Page Numbers */}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "secondary.default",
              fontSize: "14px",
              minWidth: "32px",
              height: "32px",
              "&:hover": {
                backgroundColor: "secondary.contrastText",
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "transparent",
              color: "primary.contrastText",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "secondary.contrastText",
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "secondary.default",
            },
          }}
        />

        {/* Next Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            sx={{
              color:
                currentPage === totalPages
                  ? "secondary.contrastText"
                  : "secondary.default",
              fontSize: "14px",
              cursor: currentPage === totalPages ? "default" : "pointer",
              userSelect: "none",
              "&:hover":
                currentPage === totalPages
                  ? {}
                  : {
                      color: "primary.contrastText",
                    },
            }}
            onClick={handleNext}
          >
            Next
          </Typography>
          <IconButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
            sx={{
              color:
                currentPage === totalPages
                  ? "secondary.contrastText"
                  : "secondary.default",
              padding: "4px",
              "&:hover": {
                backgroundColor: "secondary.contrastText",
              },
              "&.Mui-disabled": {
                color: "secondary.contrastText",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
