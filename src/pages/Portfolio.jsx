import { Box, Typography } from "../components/template/index.js";
import PortfolioPagination from "../components/Portfolio/PortfolioList/PortfolioPagination";
import PortfolioDataGrid from "../components/Portfolio/PortfolioList/PortfolioDataGrid";
import PortfolioFilters from "../components/Portfolio/PortfolioList/PortfolioFilters";

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
