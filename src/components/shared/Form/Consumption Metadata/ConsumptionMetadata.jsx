import React, { useEffect, useState, Suspense, memo, useCallback } from "react";
import {
  Typography,
  Button,
  Box, 
  Skeleton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { CONSUMPTION_AVG_FIELDS, CONSUMPTION_FIELDS } from "@/lib/constant";
import { AnimatedIconButton } from "./AnimatedIconButton";
import DialogHoc from "@/components/ui/Dialog";
import TooltipHoc from "@/components/ui/Tooltip";
import Find_And_Replace_Icon from '@/assets/icons/find-replace.svg'

// Lazy imports
const CorrectionAndGuideLines = React.lazy(() =>
  import("./CorrectionAndGuideLines")
);
const FindAndReplace = React.lazy(() => import("./FindAndReplace"));
const HoverInput = React.lazy(() => import("@/components/ui/form/Input"));

const FIELD_GRID = {
  CONSUMPTION: { xs: "1fr", sm: "repeat(5, 1fr)" },
  AVG: { xs: "1fr", sm: "repeat(4, 1fr)" },
};

const SKELETON = <Skeleton variant="rectangular" width="100%" height={400} />;

function ConsumptionMetadata({ form }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAnimate((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Memoized field renderer for performance
  const renderField = useCallback(
    ({ name, tooltipMessage, label }) => (
      <Controller
        key={name}
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <HoverInput
            id={`${name}Target`}
            label={label}
            fullWidth
            hideClearIcon
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
    ),
    [form.control]
  );

  return (
    <Box
      display="flex"
      gap={2}
      px={2}
      flexDirection={{ xs: "column", md: "row" }}
    >
      {/* Left: Metadata Fields */}
      <Box display="flex" gap={2} width="100%" alignItems="flex-start">
        <Box minWidth={141} width={141}>
          <Typography
            fontSize={14}
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
          display="flex"
          flexDirection="column"
          gap={2}
          width="100%"
        >
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={FIELD_GRID.CONSUMPTION}
            width="100%"
          >
            {CONSUMPTION_FIELDS.map(renderField)}
          </Box>
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={FIELD_GRID.CONSUMPTION}
            width="100%"
          >
            {CONSUMPTION_AVG_FIELDS.map(renderField)}
          </Box>
        </Box>
      </Box>

      {/* Right: Actions */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        ml={{ xs: "155px", md: 0 }}
        mt="auto"
      >
        {/* Add Instance Button */}
        <Suspense fallback={SKELETON}>
          <TooltipHoc message="Add Instance">
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
        </Suspense>

        {/* Find & Replace Dialog */}
        <Suspense fallback={SKELETON}>
          <DialogHoc
            trigger={({ onClick }) => (
              <TooltipHoc message="Find & Replace">
                <Button
                  id="findAndReplace"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onClick}
                  sx={{ p: "6px" }}
                >
                  <Box
                    component="img"
                    src={Find_And_Replace_Icon}
                    alt="Find & Replace"
                    sx={{ width: 24, height: 24 }}
                  />
                </Button>
              </TooltipHoc>
            )}
            content={({ handleClose }) => (
              <Suspense fallback={SKELETON}>
                <FindAndReplace onClose={handleClose} />
              </Suspense>
            )}
            sx={{ width: 400, m: "auto" }}
          />
        </Suspense>

        {/* Help/Guidelines Dialog */}
        <DialogHoc
          maxWidth="md"
          fullWidth
          trigger={({ onClick }) => (
            <Suspense fallback={SKELETON}>
              <TooltipHoc message="Data correction & adjustment guidelines">
                <AnimatedIconButton
                  onClick={onClick}
                  className={animate ? "animate" : ""}
                >
                  <HelpOutlineIcon />
                </AnimatedIconButton>
              </TooltipHoc>
            </Suspense>
          )}
          content={({ handleClose }) => (
            <Suspense fallback={SKELETON}>
              <CorrectionAndGuideLines handleClose={handleClose} />
            </Suspense>
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

export default memo(ConsumptionMetadata);
