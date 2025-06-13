import React, { lazy } from "react";
import { Box, Typography } from "@mui/material";
import { GENERIC_FIELDS } from "@/lib/constant";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import HoverSelect from "@/components/ui/form/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentProviderInstanceTypes,
  selectCurrentProviderPricingModels,
  selectCurrentProviderRegions,
} from "@/redux/features/providerData/providerData.selector";
import { setRegion } from "@/redux/features/providerData/providerData.slice";

const HoverInput = lazy(() => import("@/components/ui/form/Input"));

const GenericMetadata = ({ form }) => {
  const dispatch = useDispatch();
  const options = {
    region: useSelector(selectCurrentProviderRegions),
    instanceType: useSelector(selectCurrentProviderInstanceTypes),
    pricingModel: useSelector(selectCurrentProviderPricingModels),
  };

  const renderField = ({ name, label,type, tooltipMessage }) => (
    <Controller
      key={name}
      name={name}
      control={form.control}
      render={({ field, fieldState }) =>
        type =="select" ?(
          <HoverSelect
            id={`${name}Target`} 
            name={name}
            tooltipMessage={tooltipMessage}
            label={label}
            options={options[name] || []}
            fullWidth
            value={field.value}
            error={!!fieldState.error}
            {...field}
            onChange={(e) => { 
              field.onChange(e);
              if (name === "region") {
                form.setValue("instanceType", "");
                dispatch(setRegion( e.target.value ));
              } 
            }}
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
      display="flex"
      flexDirection="row"
      gap="16px"
      sx={{ p: 2, width: "100%", alignItems: "center" }}
    >
      <Box sx={{ minWidth: "141px", width: "141px" }}>
        <Typography
          fontSize="14px"
          color="secondary.default"
          variant="body1"
          gutterBottom
        >
          Generic Metadata
        </Typography>
      </Box>
      <Box
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
        {GENERIC_FIELDS.map(renderField)}
      </Box>
    </Box>
  );
};

GenericMetadata.propTypes = {
  form: PropTypes.object.isRequired,
};

export default GenericMetadata;
