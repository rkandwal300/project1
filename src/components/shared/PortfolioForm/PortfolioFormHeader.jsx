import React from "react";
import {
  Grid,
  TextField, 
  Checkbox,
  FormControlLabel, 
} from "@mui/material";
import FileUploadField from "./UploadInstances";
import CustomSelect from "./CustomSelect";


function PortfolioFormHeader() {
      const [showSelfPerf, setShowSelfPerf] = React.useState(false);
      const [selectedValue, setSelectedValue] = React.useState("");
      const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
  return (
     <Grid columns={12} container spacing={2}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="stretch"
          wrap="wrap"
          width={"100%"}
        >
          {/* Column Group 1 */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} alignItems="stretch">
              <Grid item xs={12} md={4}>
                <TextField label="Portfolio Name" fullWidth required />
              </Grid>

              <Grid item xs={12} md={4}>
                <FileUploadField label="Upload Instances" />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showSelfPerf}
                      onChange={(e) => setShowSelfPerf(e.target.checked)}
                    />
                  }
                  label="Self Perf Assessment"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Column Group 2 */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} alignItems="stretch">
              {showSelfPerf && (
                <Grid item xs={12} md={6}>
                  <FileUploadField label="Upload Self Perf assessment" />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <CustomSelect
                  selectedValue={selectedValue}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default PortfolioFormHeader