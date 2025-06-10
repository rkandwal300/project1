import React, { useState, useCallback, lazy } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Box } from "@mui/material";
import { selectPortfolioName } from "@/redux/features/instance/instance.selector";
import { useDispatch, useSelector } from "react-redux";
import { setPortFolioName } from "@/redux/features/instance/instance.slice";

// Lazy load components
const FileUploadField = lazy(() => import("./UploadInstances"));
const DownloadSelect = lazy(() => import("./DownloadSelect"));
const HoverInput = lazy(() => import("@/components/ui/form/input"));

const TOOLTIP_MESSAGE =
  "No special characters are allowed, except for underscores (_) and hyphens (-). Additionally, keywords like 'advice' and the name of the selected CSP, (e.g., aws, azure, gcp) are not accepted when entered in lowercase.";

const PortfolioDetails = () => {
  const name = useSelector(selectPortfolioName);
  const dispatch = useDispatch();
  const [showSelfPref, setShowSelfPref] = useState(false);
  const handleSelfPrefChange = useCallback(() => {
    setShowSelfPref((prev) => !prev);
  }, []);
  const handleValueChange = (e) => {
    const { value } = e.target;
    if (value.trim() != name) {
      dispatch(setPortFolioName(value.trim()));
    }
  };
  return (
    <Box
      component="div"
      display={"flex"}
      sx={{ flexDirection: { sx: "column", md: "row" } }}
      spacing={2}
      alignItems="center"
      width="100%"
      noValidate
      flexWrap={"wrap"}
      p={2}
      gap={2}
    >
      <HoverInput
        id="portfolio-name"
        label="Portfolio Name"
        name="portfolioName"
        value={name}
        fullWidth
        tooltipMessage={TOOLTIP_MESSAGE}
        hideClearIcon
        onChange={handleValueChange}
        width={{ xs: "100%", sm: "300px" }}
      />

      <FileUploadField
        label="Upload Instances"
        fullWidth
        sx={{ flex: 1 }}
        id="uploadInstances"
      />

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
          minWidth: "200px",
          maxWidth: "250px",
          width: "100%",
        }}
      />

      <Box
        display={"grid"}
        gap={2}
        gridTemplateColumns={{
          xs: "1fr",
          sm: `repeat(${showSelfPref ? "2" : "1"},1fr)`,
        }}
        alignItems={"center"}
        maxWidth={"500px"}
        minWidth={"192px"}
      >
        {showSelfPref && (
          <FileUploadField
            label="Upload Self Perf assessment"
            id="uploadSelfPerf"
            fullWidth
            sx={{ flex: 1, width: "50%" }}
          />
        )}

        <DownloadSelect />
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
