import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "../../template/index.js";
import Divider from "../../template/Divider.jsx";
import Toolbar from "../../template/Toolbar.jsx";
import { useState } from "react";
import {SearchIcon, FilterListIcon} from "../../template/icons"; 
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../router/routePaths";

function PortfolioFilters() {
  const [rows, setRows] = useState(10);
  const filterList = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "AWS",
      value: "aws",
    },
    {
      label: "AZURE",
      value: "azure",
    },
    {
      label: "GCP",
      value: "gcp",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
        justifyContent: "space-between",
        boxShadow: "none",
        alignItems: "start",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search anything"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  color="inherit"
                  sx={{ color: "secondary.contrastText" }}
                />
              </InputAdornment>
            ),
            sx: {
              color: "secondary.contrastText",
              bgcolor: "secondary.main",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.light",
              },
            },
          }}
          sx={{
            color: "secondary.contrastText",
            bgcolor: "secondary.main",
            borderRadius: 1,
            width: 250,
            input: { color: "secondary.contrastText" },
          }}
        />

        <Button
          sx={{
            display: "flex",
            color: "secondary.contrastText",
            bgcolor: "secondary.main",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <FilterListIcon />
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "35px",
            borderColor: "secondary.contrastText",
          }}
        />
        {filterList.map((val) => (
          <Button
            key={val.label}
            sx={{
              borderRadius: "27px",
              fontSize: "14px",
              display: "flex",
              color: "secondary.contrastText",
              bgcolor: "secondary.main",
              "&:hover": {
                color: "primary.main",
              },
              "&:selected": {
                fontWeight: 700,
              },
            }}
          >
            {val.label}
          </Button>
        ))}
      </Box>
      <Toolbar sx={{ gap: "16px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="white">
            Show:
          </Typography>

          <FormControl
            variant="outlined"
            size="small"
            sx={{
              minWidth: 80,
              borderRadius: 1,
              bgcolor: "secondary.main",
            }}
          >
            <Select
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              sx={{
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              {[10, 25, 50, 100].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Link
          to={RoutePaths.PORTFOLIO_CREATE}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "primary.main",
              borderColor: "primary.main",
              textTransform: "none",
              borderRadius: "6px",
              px: 2,
              fontWeight: 500,
            }}
          >
            + Add Portfolio
          </Button>
        </Link>
      </Toolbar>
    </Box>
  );
}

export default PortfolioFilters;
