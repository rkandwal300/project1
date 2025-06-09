import React, { useEffect, useState, lazy } from "react";
import { Typography, Button, Box, IconButton, Divider } from "@mui/material";
import { Add, FileCopy } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { CONSUMPTION_FIELDS } from "@/lib/constant";
import { AnimatedIconButton } from "./AnimatedIconButton";

// Dynamic imports for optimization
const DialogHoc = React.lazy(() => import("@/components/ui/Dialog"));
const FindAndReplace = React.lazy(() => import("./FindAndReplace"));
const TooltipHoc = React.lazy(() => import("@/components/ui/Tooltip"));
const HoverInput = React.lazy(() => import("@/components/ui/form/Input"));
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));

function ConsumptionMetadata({ form }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAnimate((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const renderFields = ({ name, tooltipMessage, label }) => (
    <Controller
      key={name}
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <HoverInput
          id={`${name}Target`}
          label={label}
          fullWidth
          hideClearIcon={true}
          value={field.value ?? ""}
          error={!!fieldState.error}
          tooltipMessage={tooltipMessage}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || !isNaN(Number(value))) {
              field.onChange(Number(value));
            }
          }}
        />
      )}
    />
  );

  return (
    <Box
      display="flex"
      gap="16px"
      sx={{
        px: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        gap="16px"
        sx={{ width: "100%", alignItems: "center" }}
      >
        <Box sx={{ minWidth: "141px", width: "141px" }}>
          <Typography
            fontSize="14px"
            color="secondary.default"
            variant="body1"
            gutterBottom
          >
            Consumption Metadata
          </Typography>
        </Box>

        <Box
          id="consumption-metadata-form"
          role="ConsumptionMetadataForm"
          sx={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(5, 1fr)" },
            width: "100%",
          }}
        >
          {CONSUMPTION_FIELDS.map(renderFields)}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          ml: { xs: "155px", md: "0px" },
        }}
      >
        <TooltipHoc message={"Add Instance"}>
          <Button
            id="addInstanceFormTarget"
            variant="contained"
            color="primary"
            type="submit"
            size="small"
          >
            <Add />
          </Button>
        </TooltipHoc>
        <DialogHoc
          trigger={({ onClick }) => (
            <TooltipHoc message={"Find & Replace"}>
              <Button
                id="findAndReplace"
                variant="contained"
                color="primary"
                size="small"
                onClick={onClick}
              >
                <FileCopy />
                {/* <Icon path={mdiFileReplace} size={1} /> */}
              </Button>
            </TooltipHoc>
          )}
          content={({ handleClose }) => (
            <FindAndReplace onClose={handleClose} />
          )}
          sx={{ width: "400px", m: "auto" }}
        />
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
              <Divider />
              <Box p={" 24px 24px"}>
                <Typography fontSize={"16px"} fontWeight={600}>
                  Cloud Selection:
                </Typography>

                <Typography fontSize={"16px"} margin={"4px 0 0 16px"}>
                  If the cloud value is empty, invalid, or unsupported, it will
                  be automatically set to the default Cloud Service Provider
                  (CSP).
                </Typography>
              </Box>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
}

ConsumptionMetadata.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
};

export default React.memo(ConsumptionMetadata);
