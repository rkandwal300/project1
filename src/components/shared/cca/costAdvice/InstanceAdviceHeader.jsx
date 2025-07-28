import React, { useState, useCallback } from "react";
import {
  Typography,
  Button,
  Box,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
   FormControl, InputLabel, Select, MenuItem, TextField, Grid
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import TooltipHoc from "@/components/ui/Tooltip";
import DialogHoc from "@/components/ui/Dialog";
import { useTheme } from "@emotion/react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const EXPLANATION_LIST = [
  "Instances for which performance data is unavailable.",
  "Older generation series (e.g., 3rd generations) with insufficient performance data.",
  "Graviton instances, which are not currently supported by EIA.",
];
import excellogo from "@/assets/logos/file-excel.svg"
import cost_advisor from "@/assets/cost_advisor.xlsx"

const EIAList = [
  "EIA is recommended when a more technical analysis is needed for an optimized recommendation.",
  "For disk (d) or network-enhanced (n) instances.",
  "When savings are not projected on modernized instances powered by AMD EPYC™ processors."
]
const Spinner = () => (
  <>
    <Box sx={spinnerStyles.loader} />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </>
);

const spinnerStyles = {
  loader: {
    opacity: 1,
    width: 100,
    height: 100,
    border: "10px solid #ccc",
    borderTop: "10px solid #1976d2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

const ExplanationDialogContent = ({ handleClose }) => (
  <Box p={0}>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box>
        <Typography
          variant="body2"
          fontSize={16}
          fontWeight="bold"
          gutterBottom
        >
          Invalid or Unsupported Scenarios:
        </Typography>
        <Typography variant="subtitle1" fontSize={16} gutterBottom>
          Region or Instance input data is invalid or specifies an unsupported
          instance type
        </Typography>
      </Box>
      <IconButton
      id = "input-errors-explanation-close"
       onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Divider />
    <Box p={2} pl={3}>
      <List
        sx={{
          listStyleType: "decimal",
          listStylePosition: "outside",
          pl: 2,
        }}
        dense
      >
        {EXPLANATION_LIST.map((text) => (
          <ListItem
            key={text}
            sx={{
              display: "list-item",
              p: "2px 0",
              alignItems: "flex-start",
            }}
          >
            <ListItemText
              primary={text}
              primaryTypographyProps={{ fontSize: 16 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
);

ExplanationDialogContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const EIARecommendedDialogContent = ({ handleClose }) => (
  <Box p={0}>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box>
        <Typography
          variant="body2"
          fontSize={16}
          fontWeight="bold"
          gutterBottom
        >
          When is EIA recommended?
        </Typography>

      </Box>
      <IconButton 
      onClick={handleClose}
      id = "eia-recommended-dialog-close">
       
        <CloseIcon />
      </IconButton>
    </Box>
    <Divider />
    <Box p={2} pl={3}>
      <List
        sx={{
          listStyleType: "disc",
          listStylePosition: "outside",
          pl: 2,
        }}
        dense
      >
        {EIAList.map((text) => (
          <ListItem
            key={text}
            sx={{
              display: "list-item",
              p: "2px 0",
              alignItems: "flex-start",
            }}
          >
            <ListItemText
              primary={text}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
);

const rulesDialogContent = ({ handleClose }) => (
  <Box p={0}>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box>
        <Typography
          variant="body2"
          fontSize={16}
          fontWeight="bold"
          gutterBottom
        >
          All the recommendations are based on the competitive performance analysis across and within processor offerings
        </Typography>

      </Box>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Divider />
    <Box p={1}>
      <ul>
        <li>
          <span style={{ fontWeight: 'bold' }}>Hourly Cost Optimization: </span>
          <br />
          <span>Recommendation to lower hourly costs by using 5th generation AMD processors (Milan, EPYC 7R13 series) for high efficiency and the same performance.</span>
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>Modernize: </span>
          <br />
          <span>Recommendation for using the latest AMD processors (Genoa, EPYC 9004 series) for increased performance ~2X uplift.</span>
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>Modernize & Downsize:  </span>
          <br />
          <span>Recommendation to use the latest AMD processors and smaller instance sizes for the same performance and cost savings.</span>
        </li>
        <li class="ml-2 mt-10"><a href="https://www.amd.com/en/products/processors/server/epyc/aws.html" target="_blank"> https://www.amd.com/en/products/processors/server/epyc/aws.html</a></li>
        <li class="ml-2 mt-2"><a href="https://www.amd.com/en/products/processors/server/epyc/microsoft-azure.html" target="_blank">https://www.amd.com/en/products/processors/server/epyc/microsoft-azure.html</a></li>
      </ul>
    </Box>
  </Box>
);

rulesDialogContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

EIARecommendedDialogContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
const ExportButton = React.memo(() => (
  <TooltipHoc message="Export detailed recommendation">
    <Button
      id="btn-cost-advice-export"
      variant="outlined"
      size="small"
      href={cost_advisor}
      startIcon={
        <Box
          component="img"
          src={excellogo}
          alt="Excel Export"
          sx={{ width: 18, height: 18 }}
        />
      }
    >
      Export
    </Button>
  </TooltipHoc>
));

const InstanceAdviceHeader = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('')
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const headerItems = ['ALL', 'Hourly Cost Optimization', 'Modernize', 'Modernize & Downsize'];
  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: theme.palette.grey[700],
            opacity: 0.8,
            zIndex: 1000,
          }}
        >
          <Spinner />
        </Box>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          sx={{ fontSize: "1.3rem", fontWeight: "bold", color: "primary.main" }}
        >
          Cost advice
        </Typography>


      </Box>
      <Grid container spacing={2} alignItems="center" mb={1} mt={1}>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth size="small" sx={{ mr: 1 }}>
              <InputLabel id="savings-type-label">Savings Type</InputLabel>
              <Select
                labelId="savings-type-label"
                label="Savings Type"
                fullWidth
              >
                {headerItems.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DialogHoc
              trigger={({ onClick }) => (
                <Box
                  component="span"
                  onClick={onClick}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '50%',
                    height: 32,
                    flexShrink: 0
                  }}
                >
                  <HelpOutlineIcon sx={{ color: 'black' }} />
                </Box>
              )}
              content={rulesDialogContent}
            />
          </Box>
        </Grid>

        {/* Second section: Dialog Links (3 cols) */}
        <Grid item size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: 1, md: 2 },
            }}
          >
            <DialogHoc
              trigger={({ onClick }) => (
                <Box
                id="input-errors-explanation"
                  component="span"
                  onClick={onClick}
                  sx={{
                    fontFamily: '"Open Sans", Arial, sans-serif',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: 700,
                    fontSize: { xs: '0.875rem', md: '0.9rem' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Input Errors Explanation
                </Box>
              )}
              content={ExplanationDialogContent}
            />
            <DialogHoc
              trigger={({ onClick }) => (
                <Box
                  id="eia-recommended"
                  component="span"
                  onClick={onClick}
                  sx={{
                    fontFamily: '"Open Sans", Arial, sans-serif',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: 700,
                    fontSize: { xs: '0.875rem', md: '0.9rem' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  When EIA is Recommended?
                </Box>
              )}
              content={EIARecommendedDialogContent}
            />
          </Box>
        </Grid>

        {/* Third section: Slider + Controls (5 cols) */}
        <Grid item size={{ xs: 12, md: 4 }} sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: { xs: 1, md: 2 },
          marginLeft: '80px'
        }}>
           <Box display="flex" gap={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ExportButton />
        </Box>

        </Grid>
      </Grid>
    </>
  );
};

InstanceAdviceHeader.propTypes = {
  isAnnually: PropTypes.bool.isRequired,
  setIsAnnually: PropTypes.func.isRequired,
};

export default InstanceAdviceHeader;
