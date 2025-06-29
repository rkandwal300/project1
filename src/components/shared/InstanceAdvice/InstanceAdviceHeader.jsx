import React, { useState, useCallback } from "react";
import {
  Typography,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Slider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";
import TooltipHoc from "@/components/ui/Tooltip";
import DialogHoc from "@/components/ui/Dialog";
import { useTheme } from "@emotion/react";
import cost_advisor from "@/assets/downloads/cost_advisor.xlsx";
import Excel_Icon from "@/assets/icons/file-excel.svg";

const EXPLANATION_LIST = [
  "Instances for which performance data is unavailable.",
  "Older generation series (e.g., 3rd generations) with insufficient performance data.",
  "Graviton instances, which are not currently supported by EIA.",
];

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
      <IconButton onClick={handleClose}>
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
          src={Excel_Icon}
          alt="Excel Export"
          sx={{ width: 18, height: 18 }}
        />
      }
    >
      Export
    </Button>
  </TooltipHoc>
));

const AnnuallyCheckbox = React.memo(({ isAnnually, setIsAnnually }) => (
  <FormControlLabel
    id="annuallyPrice"
    sx={{
      width: "fit-content",
      px: 1,
      "& .MuiFormControlLabel-label": {
        fontWeight: 600,
        fontSize: 16,
        color: "#5f5f5f",
      },
    }}
    control={
      <Checkbox
        checked={isAnnually}
        onChange={(e) => setIsAnnually(e.target.checked)}
        inputProps={{
          "aria-label": "Annually",
          "aria-describedby": "annuallyPrice-messages",
        }}
      />
    }
    label="Annually"
  />
));

AnnuallyCheckbox.propTypes = {
  isAnnually: PropTypes.bool.isRequired,
  setIsAnnually: PropTypes.func.isRequired,
};

const InstanceAdviceHeader = ({ isAnnually, setIsAnnually }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

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
          Instance advice
        </Typography>
        <ExportButton />
      </Box>
      <AnnuallyCheckbox isAnnually={isAnnually} setIsAnnually={setIsAnnually} />
      <Box
        display="flex"
        flexDirection={isMd ? "row" : "column"}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        ml="auto"
        mb={3}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Open Sans", Arial, sans-serif',
            fontSize: 13,
          }}
        >
          CI-Current Instance Data,{" "}
          <Box
            component="span"
            sx={{ ml: 1, fontFamily: '"Open Sans", Arial, sans-serif' }}
          >
            Performance Improvement*
          </Box>
          <DialogHoc
            trigger={({ onClick }) => (
              <Box
                component="span"
                onClick={onClick}
                sx={{
                  ml: 1,
                  fontFamily: '"Open Sans", Arial, sans-serif',
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: 700,
                }}
              >
                Input Errors Explanation
              </Box>
            )}
            content={ExplanationDialogContent}
          />
        </Typography>
        <Box
          sx={{
            width: 350,
            mr: 2.5,
            display: "flex",
            gap: 1.25,
            alignItems: "center",
          }}
        >
          <Slider
            defaultValue={20}
            step={10}
            marks
            min={0}
            max={100}
            valueLabelDisplay="on"
          />
          <Button onClick={handleRefresh} disabled={loading}>
            <RefreshIcon
              sx={
                loading
                  ? {
                      "@keyframes spin": {
                        from: { transform: "rotate(0deg)" },
                        to: { transform: "rotate(360deg)" },
                      },
                      animation: "spin 2s linear infinite",
                    }
                  : undefined
              }
              fontSize="large"
            />
          </Button>
        </Box>
      </Box>
    </>
  );
};

InstanceAdviceHeader.propTypes = {
  isAnnually: PropTypes.bool.isRequired,
  setIsAnnually: PropTypes.func.isRequired,
};

export default InstanceAdviceHeader;
