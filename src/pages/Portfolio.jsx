import { Box, Typography } from "@mui/material";
import PortfolioPagination from "../components/Portfolio/PortfolioPagination";
import PortfolioDataGrid from "../components/Portfolio/PortfolioDataGrid";
import PortfolioFilters from "../components/Portfolio/PortFolioFilters";

function Portfolio() {
  return (
    <Box className="page">
      <Typography variant="h5" fontWeight={"700"}>
        Portfolio List
      </Typography>
      <PortfolioFilters />
      <PortfolioDataGrid />
      <PortfolioPagination />
    </Box>
  );
}

export default Portfolio;
