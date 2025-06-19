import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import HoverSelect from "@/components/form/Select";

function FindReplaceRow({ name, label,selectedOptions, options, control, id, error }) {
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
        }}
      >
        <Controller
          name={`values.${name}.from`}
          control={control}
          render={({ field }) => (
            <HoverSelect
            tooltipPosition="top"
              id={`${id}From`}
              name={name}
              tooltipMessage={"Select an option..."}
              label="From"
              options={selectedOptions}
              fullWidth
              value={field.value || ""}
              {...field}
              sx={{ flex: 1, width:120 }}
              error={!!error}
            />
          )}
        />

        <ArrowRightAltIcon
          sx={{ fontSize: 28, marginTop: "-10px", flexShrink: 0 }}
        />

        <Controller
          name={`values.${name}.to`}
          control={control}
          render={({ field }) => (
            <HoverSelect
              id={`${id}To`}
              name={name}
              tooltipMessage={"Select an option..."}
              label="To"
              options={options}
              fullWidth
              value={field.value || ""}
              {...field}
              sx={{ flex: 1 , width:120}}
              error={!!error}
            />
          )}
        />
      </Box>
      {error && (
        <Typography variant="caption" color="error">
          {error.message}
        </Typography>
      )}
    </Box>
  );
}

FindReplaceRow.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  control: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.object,
};

export default FindReplaceRow;
