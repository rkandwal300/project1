import React from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import TooltipHoc from "@/components/ui/Tooltip";
import DialogHoc from "@/components/ui/Dialog";

const EXPLANATION_LIST = [
  "Instances for which performance data is unavailable.",
  "Older generation series (e.g., 3rd generations) with insufficient performance data.",
  "Graviton instances, which are not currently supported by EIA.",
];

const ExplanationDialogContent = ({ handleClose }) => (
  <Box sx={{ p: 0 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      <Box>
        <Typography variant="body2" fontSize={16} fontWeight="bold" gutterBottom>
          Invalid or Unsupported Scenarios:
        </Typography>
        <Typography variant="subtitle1" fontSize={16} gutterBottom>
          Region or Instance input data is invalid or specifies an unsupported instance type
        </Typography>
      </Box>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Divider />
    <Box sx={{ p: 2, pl: 3 }}>
      <List
        sx={{
          listStyleType: "decimal",
          listStylePosition: "outside",
          pl: 2,
        }}
        dense
      >
        {EXPLANATION_LIST.map((text, idx) => (
          <ListItem
            key={idx}
            sx={{
              display: "list-item",
              p: "2px 0",
              alignItems: "flex-start",
            }}
          >
            <ListItemText primary={text} primaryTypographyProps={{ fontSize: 16 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
);

ExplanationDialogContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const ExportButton = () => (
  <TooltipHoc message="Export detailed recommendation">
    <Button
      id="btn-cost-advice-export"
      variant="outlined"
      size="small"
      href="/cost_advisor.xlsx"
      startIcon={
        <Box
          component="img"
          src="/file-excel.svg"
          alt="Excel Export"
          sx={{ width: 18, height: 18 }}
        />
      }
    >
      Export
    </Button>
  </TooltipHoc>
);

const AnnuallyCheckbox = ({ isAnnually, setIsAnnually }) => (
  <FormControlLabel
    sx={{
      px: 1,
      "& .MuiFormControlLabel-label": {
        fontWeight: 600,
        fontSize: 16,
        color: "#5f5f5f",
      },
    }}
    control={
      <Checkbox
        id="annuallyPrice"
        value={isAnnually}
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
);

AnnuallyCheckbox.propTypes = {
  isAnnually: PropTypes.bool.isRequired,
  setIsAnnually: PropTypes.func.isRequired,
};

const InstanceAdviceHeader = ({ isAnnually, setIsAnnually }) => (
  <>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography
        variant="h6"
        sx={{ fontSize: "1.3rem", fontWeight: "bold", color: "primary.main" }}
      >
        Instance advice
      </Typography>
      <ExportButton />
    </Box>

    <Typography
      variant="body2"
      sx={{ fontSize: 13, color: "primary.main", px: 1, pt: 2.5 }}
    >
      *Note : All measurements are per month
    </Typography>

    <AnnuallyCheckbox isAnnually={isAnnually} setIsAnnually={setIsAnnually} />

    <Typography
      variant="body2"
      sx={{
        fontFamily: '"Open Sans", Arial, sans-serif',
        fontSize: 13,
        ml: "auto",
        mb: 3,
      }}
    >
      CI-Current Instance Data,{" "}
      <span style={{ marginLeft: 8, fontFamily: '"Open Sans", Arial, sans-serif' }}>
        Performance Improvement*
      </span>
      <DialogHoc
        trigger={({ onClick }) => (
          <span
            onClick={onClick}
            style={{
              marginLeft: 8,
              fontFamily: '"Open Sans", Arial, sans-serif',
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: 700,
            }}
          >
            Input Errors Explanation
          </span>
        )}
        content={ExplanationDialogContent}
      />
    </Typography>
  </>
);

InstanceAdviceHeader.propTypes = {
  isAnnually: PropTypes.bool.isRequired,
  setIsAnnually: PropTypes.func.isRequired,
};

export default InstanceAdviceHeader;
