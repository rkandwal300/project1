import React from "react";
import {
  Grid,
  TextField, 
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography, 
} from "@mui/material"; 

const regions = ["US-East", "US-West", "EU-Central"];
const instanceTypes = ["t2.micro", "t2.medium", "m5.large"];
const pricingModels = ["On-Demand", "Reserved"];

function GenericMetadata() {
  return (
    <Box p={2} width="100%">
     <Grid container spacing={2}>


      {/* Row 2 - Generic metadata */}
      <Grid item xs={12} md={3}>
        <Typography variant="p" gutterBottom>
            Generic Metadata
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth required>
          <InputLabel>Region</InputLabel>
          <Select label="Region">
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Instance Type</InputLabel>
          <Select label="Instance Type">
            {instanceTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField label="UUID/Instance Name" fullWidth />
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Pricing Model</InputLabel>
          <Select label="Pricing Model">
            {pricingModels.map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
 
     </Grid>
    </Box>
  );
}

export default GenericMetadata;
