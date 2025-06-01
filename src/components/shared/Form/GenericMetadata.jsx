import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { Box, Typography } from "@mui/material";
import tour from "@/tour/tour"; 
import { GENERIC_FIELDS, GENERIC_TOUR_STEPS } from "@/lib/constant";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types"; 

const HoverInput = lazy(() => import("@/components/ui/form/Input"));
const HoverSelect = lazy(() => import("@/components/ui/form/Select"));

const GenericMetadata = ({ form }) => {
  const handleFieldClick = useCallback(() => {
    
  }, []);

  useEffect(() => {
    GENERIC_TOUR_STEPS.forEach(({ id, text, attachTo, field, next, prev }) => {
      tour.addStep({
        id,
        text,
        attachTo,
        buttons: [
          prev && {
            text: "Back",
            action: () => tour.show(prev),
          },
          {
            text: "Next",
            action: () => {
              handleFieldClick(field);
              tour.show(next);
            },
          },
        ].filter(Boolean),
      });
    });
    // eslint-disable-next-line
  }, [handleFieldClick]);

  const renderField = ({ name, label, options, tooltipMessage }) => (
    <Controller
      key={name}
      name={name}
      control={form.control}
      render={({ field, fieldState }) =>
        options ? (
          <HoverSelect
            id={`${name}Target`}
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
