import React, { lazy, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, IconButton, Divider, Grid, Tooltip } from "@mui/material";
import { CCA_FIELDS } from "@/lib/constant";
import { Controller } from "react-hook-form";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PropTypes from "prop-types"; 
import { AnimatedIconButton } from "@/components/shared/Form/Consumption Metadata/AnimatedIconButton";
import { Add } from "@mui/icons-material";
import { selectCurrentProviderInstanceTypes, selectCurrentProviderPricingModels, selectCurrentProviderRegions } from "@/redux/features/providerData/providerData.selector";
import { setRegion } from "@/redux/features/providerData/providerData.slice";
import replaceLogo from "@/assets/icons/find-replace.svg"
import HoverSelect from "@/components/ui/form/Select";


const HoverInput = lazy(() => import("@/components/ui/form/Input"));
const DialogHoc = React.lazy(() => import("@/components/ui/Dialog"));
const TooltipHoc = React.lazy(() => import("@/components/ui/Tooltip"));
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));
const FindAndReplace = React.lazy(() => import("@/components/shared/Form/Consumption Metadata/FindAndReplace"));

const GenericMetadata = ({ form }) => {

  const renderField = ({ name, label, type, tooltipMessage }) => (
    <Controller
      key={name}
      name={name}
      control={form.control}
      render={({ field, fieldState }) =>
        type == "select" ? (
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
                dispatch(setRegion(e.target.value));
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
  const dispatch = useDispatch();
  const options = {
    region: useSelector(selectCurrentProviderRegions),
    instanceType: useSelector(selectCurrentProviderInstanceTypes),
    pricingModel: useSelector(selectCurrentProviderPricingModels),
  };


  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAnimate((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 1, width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>


      <Box id="formFields" role="portfolioForm"  sx={{ width: "70%", mb: 1.5, display: 'grid', gap: '16px', gridTemplateColumns: { xs: 'repeat(1,1fr)', sm: 'repeat(4,1fr)' } }}>
        {CCA_FIELDS.map((field) => (
          <Box key={field.name} sx={{ width: '100%', gridColumn: { xs: 'span 1', sm: field.name === "uuid" || field.name === "noOfHours" ? 'span 2' : 'span 1' } }}>
            {renderField(field)}
          </Box>
        ))}

      </Box>
      <Box display="flex" width="30%" gap={1} justifyContent="flex-start" alignItems="end" sx={{ marginBottom: { xs: 1.5, sm: 1.5 } }}>
        <TooltipHoc message={"Add Instance"}>
          <Button
            id="addInstanceFormTarget"
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            style={{
              width: '60%',
              height: '40px',
            }}
          >
            <Add />
          </Button>
        </TooltipHoc>

        {/* Your Find & Replace Button */}
        <DialogHoc
          trigger={({ onClick }) => (
            <TooltipHoc message={"Find & Replace"}>
              <Button
                id="findAndReplace"
                variant="contained"
                color="primary"
                size="small"
                onClick={onClick}
                sx={{ padding: "6px", width: '60%', height: '40px' }}
              >
                <Box
                  component="img"
                  src={replaceLogo}
                  alt="Find & Replace"
                  sx={{ width: 24, height: 24 }}
                />
              </Button>
            </TooltipHoc>
          )}
          content={({ handleClose }) => (
            <FindAndReplace onClose={handleClose} />
          )}
          sx={{ width: "400px", m: "auto" }}
        />

        {/* Help Button */}
        <DialogHoc
          maxWidth="md"
          fullWidth={true}
          trigger={({ onClick }) => (
            <TooltipHoc message={"Data correction & adjustment guidelines"}>
              <AnimatedIconButton
                onClick={onClick}
                className={animate ? "animate" : ""}
              >
                <HelpOutlineIcon />
              </AnimatedIconButton>
            </TooltipHoc>
          )}
          content={({ handleClose }) => (
            <Box sx={{ p: 0 }} gap={0} width={"full"} color={"primary.main"}>
              <Box
                display={"flex"}
                justifyContent="space-between"
                alignItems="center"
                p={"10px 24px"}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontSize={"18px"}
                  gutterBottom
                >
                  How data corrections are applied:
                </Typography>

                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ borderBottom: "1px solid black" }} />
              <Box p="24px 24px">
     
                <Typography fontSize="16px" fontWeight={600}>
                  1. Cloud Selection:
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5} >
                  If the cloud is empty, invalid, or unsupported, it will be replaced with the default CSP selected.
                </Typography>

                <Typography fontSize="16px" fontWeight={600} mt={2}>
                  2. Quantity:
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • The quantity should be a positive number. If a floating-point number is provided, it will be rounded off.
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • If the value is not mentioned, it will default to 1.
                </Typography>

              
                <Typography fontSize="16px" fontWeight={600} mt={2}>
                  3. Number of Hours per Month:
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • If the value is empty, it will be set to (quantity * 730). For example, if the quantity is 5 and the number of hours per month is not mentioned, it will be auto-corrected to (5 * 730) = 3650.
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • If the value exceeds (quantity * 730), it will automatically be set to (quantity * 730).
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • If the value is a floating-point number, it will be rounded off.
                </Typography>

               
                <Typography fontSize="16px" fontWeight={600} mt={2}>
                  4. Pricing Model:
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • Currently, only two pricing models are supported: on-demand and reserved.
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • If the pricing model is empty, it will default to on-demand.
                </Typography>
                <Typography fontSize="16px" ml={2} mt={0.5}>
                  • If the value is something other than the supported options, the user can replace it with on-demand or reserved using the “find and replace” option.
                </Typography>
              </Box>
            </Box>
          )}
        />

      </Box>


      <Grid container spacing={0.5} alignItems="flex-end">

        {/* Buttons container */}
        <Grid item size={{ xs: 12, md: 4 }}>

        </Grid>
      </Grid>
    </Box>
  )
}

GenericMetadata.propTypes = {
  form: PropTypes.object.isRequired,
};

export default GenericMetadata;