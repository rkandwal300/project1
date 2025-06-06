import React, { lazy } from "react";
import { Box, Typography } from "@mui/material";
import { GENERIC_FIELDS } from "@/lib/constant";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import HoverSelect from "@/components/ui/form/Select";

const HoverInput = lazy(() => import("@/components/ui/form/Input")); 

const GenericMetadata = ({ form }) => {
  const renderField = ({ name, label, options, tooltipMessage }) => (
    <Controller
      key={name}
      name={name}
      control={form.control}
      render={({ field, fieldState }) =>
        options ? (
          <HoverSelect
            id={`${name}Target`}
            name={name}
            tooltipMessage={tooltipMessage}
            label={label}
            options={options}
            fullWidth
            value={field.value}
            error={!!fieldState.error}
            {...field}
          />
        ) : (
          <HoverInput
            id={`${name}Target`}
            tooltipMessage={tooltipMessage}
            label={label}
            fullWidth
            value={field.value}
            error={!!fieldState.error}
            {...field}
          />
        )
      }
    />
  );

  return (
    <Box
      p={2}
      width="100%"
      display="grid"
      id="generic-metadata-form"
      role="GenericMetadataForm"
      sx={{
        gridTemplateColumns: { xs: "repeat(1,1fr)", sm: "repeat(5, 1fr)" },
      }}
      gap={2}
      alignItems="center"
    >
      <Typography
        fontSize="14px"
        color="secondary.default"
        variant="body1"
        gutterBottom
      >
        Generic Metadata
      </Typography>
      {GENERIC_FIELDS.map(renderField)}
    </Box>
  );
};

GenericMetadata.propTypes = {
  form: PropTypes.object.isRequired,
};

export default GenericMetadata;
