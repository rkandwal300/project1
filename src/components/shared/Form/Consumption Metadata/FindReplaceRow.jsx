import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

function FindReplaceRow({ name, label, options, control }) {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="caption" sx={{ fontSize: 16, fontWeight: 600 }}>
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 1,
          justifyContent: "space-between",
        }}
      >
        <Controller
          name={`values.${name}.from`}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth variant="filled">
              <InputLabel>From</InputLabel>
              <Select {...field} value={field.value || ""}>
                <MenuItem value="">None</MenuItem>
                {options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <ArrowRightAltIcon sx={{ fontSize: 28, marginTop: "-10px" }} />
        <Controller
          name={`values.${name}.to`}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth variant="filled">
              <InputLabel>To</InputLabel>
              <Select {...field} value={field.value || ""}>
                <MenuItem value="">None</MenuItem>
                {options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>
    </Box>
  );
}
FindReplaceRow.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  control: PropTypes.object.isRequired,
};

export default FindReplaceRow;
