import React, { useState, useCallback, lazy } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Box } from "@mui/material";
import { Controller } from "react-hook-form"; 

// Lazy load components
const FileUploadField = lazy(() => import("./UploadInstances"));
const DownloadSelect = lazy(() => import("./DownloadSelect"));
const HoverInput = lazy(() => import("@/components/ui/form/input"));

const TOOLTIP_MESSAGE =
  "No special characters are allowed, except for underscores (_) and hyphens (-). Additionally, keywords like 'advice' and the name of the selected CSP, (e.g., aws, azure, gcp) are not accepted when entered in lowercase.";

const PortfolioDetails = ({ form }) => {
  const [showSelfPref, setShowSelfPref] = useState(false); 
  const handleSelfPrefChange = useCallback(() => {
    setShowSelfPref((prev) => !prev);
  }, []);


  return (
    <Box
      component="div"
      display={"flex"}
      sx={{ flexDirection: { sx: "column", md: "row" },}}
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      noValidate
      flexWrap={"wrap"}
      p={2}
      gap={2}
    >
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(3,1fr)"}
        gap={2}
        alignItems={"center"}
      >
        <Controller
          name="portfolioName"
          control={form.control}
          render={({ field, fieldState }) => (
            <HoverInput
            id="portfolio-name"
              label="Portfolio Name"
              name = "portfolioName"
              value={field.value}
              fullWidth
              tooltipMessage={TOOLTIP_MESSAGE}
              hideClearIcon
              onChange={field.onChange}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <FileUploadField label="Upload Instances" fullWidth sx={{ flex: 1 }} id="uploadInstances" />

        <FormControlLabel
          control={
            <Checkbox
            id={"openSelfPrefCheckbox"}
              checked={showSelfPref}
              onChange={handleSelfPrefChange}
              color="primary"
            />
          }
          label="Self Perf Assessment"
          sx={{
            m: 0,
            fontSize: "14px",
            fontWeight: 600,
            color: "secondary.default",
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
          }}
        />
      </Box>

      <Box display={"grid"} gap={2} gridTemplateColumns={`repeat(${showSelfPref?"2":"1"},1fr)`} alignItems={"center"} maxWidth={"400px"}  minWidth={'192px'}>
        {showSelfPref && (
          <FileUploadField
            label="Upload Self Perf assessment"
            id="uploadSelfPerf"
            fullWidth
            sx={{ flex: 1, width: "50%" }}
          />
        )}

        <DownloadSelect  />
      </Box>
    </Box>
  );
};

PortfolioDetails.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
};

export default React.memo(PortfolioDetails);
