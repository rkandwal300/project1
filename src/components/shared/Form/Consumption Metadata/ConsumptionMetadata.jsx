import React, { useEffect, useState, lazy, Suspense } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Add, FileCopy } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstanceFormData,
  selectInstanceResponse,
} from "@/redux/features/instance/instance.selector";
import { updateFormData } from "@/redux/features/instance/instance.slice";
import tour from "@/tour/tour";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { CONSUMPTION_FIELDS, CONSUMPTION_TOUR_STEPS } from "@/lib/constant";
import { AnimatedIconButton } from "./AnimatedIconButton";

// Lazy load components
const HoverInput = lazy(() => import("@/components/ui/form/Input"));
// const AnimatedIconButton = lazy(() => import("./AnimatedIconButton"));

function ConsumptionMetadata({ form }) {
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(selectInstanceFormData);
  const response = useSelector(selectInstanceResponse);

  useEffect(() => {
    CONSUMPTION_TOUR_STEPS.forEach((step) => {
      tour.addStep({
        id: step.id,
        text: step.text,
        attachTo: step.attachTo,
        buttons: [
          {
            text: "Back",
            action: () => tour.show(step.prev),
          },
          {
            text: "Next",
            action: () => {
              if (step.field && !state[step.field]) {
                dispatch(
                  updateFormData({ [step.field]: response[step.field] })
                );
              }
              tour.show(step.next);
            },
          },
        ],
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setAnimate((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const renderFields = ({ name, tooltipMessage, label }) => (
    <Controller
      key={name}
      id={`${name}Target`}
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <HoverInput
        label={label}
        fullWidth
        hideClearIcon={true}
        value={field.value ?? ""}
        error={!!fieldState.error}
        tooltipMessage={tooltipMessage}
          onChange={(e) => {
            const value = e.target.value;
            // Only update if value is a number (allow empty string for clearing)
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
        sx={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(6, 1fr)" },
          width: "100%",
        }}
      >
        <Typography
          fontSize="14px"
          color="secondary.default"
          variant="body1"
          gutterBottom
        >
          Consumption Metadata
        </Typography>
        {CONSUMPTION_FIELDS.map(renderFields)}
      </Box>
      <Box display="flex" alignItems="center" gap="16px">
        <Button
          id="seventhStepTarget"
          variant="contained"
          color="primary"
          type="submit"
          size="small"
        >
          <Add />
        </Button>
        <Button
          id="eightStepTarget"
          variant="contained"
          color="primary"
          size="small"
        >
          <FileCopy />
        </Button>
        <AnimatedIconButton
          id="nineStepTarget"
          className={animate ? "animate" : ""}
        >
          <HelpOutlineIcon />
        </AnimatedIconButton>
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
