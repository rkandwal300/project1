import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  IconButton,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { Add, FileCopy } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstanceFormData,
  selectInstanceResponse,
} from "@/redux/features/instance/instance.selector";
import {
  addInstance,
  updateFormData,
} from "@/redux/features/instance/instance.slice";
import tour from "@/tour/tour";

// Styled animated icon
const AnimatedIconButton = styled(IconButton)(() => ({
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  borderRadius: "50%",
  width: 50,
  height: 50,
  transition: "color 0.5s ease-in-out, background-color 0.5s ease-in-out",
  color: "#000",

  "&.animate": {
    color: "#fff",
  },
}));

function ConsumptionMetadata() {
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(selectInstanceFormData);
  const response = useSelector(selectInstanceResponse);

  const handleFieldClick = (field) => {
    if (!state[field]) {
      console.log({
        [field]: response[field],
      });
      dispatch(
        updateFormData({
          [field]: response[field],
        })
      );
    }
  };

  const handleChange = (field) => {
    if (!response[field]) {
      dispatch(
        updateFormData({
          [field]: response[field],
        })
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const fields = [
    { label: "Max CPU %", name: "maxCpuUtilization" },
    { label: "Max Mem", name: "maxMemoryUsed" },
    { label: "Max Network BW", name: "maxNetworkBandwidth" },
    { label: "Max Disk BW", name: "maxDiskBandwidth" },
    { label: "Max IOPS", name: "maxIOPS" },
  ];

  useEffect(() => {
    // Sixth step
    tour.addStep({
      id: "step-sixth",
      text: "This is the Sixth step.",
      attachTo: {
        element: "#sixthStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => {
            tour.show("step-eight");
          },
        },
        {
          text: "Next",
          action: () => {
            console.log("Clicked region field");
            handleFieldClick("region");
            tour.show("step-seventh");
          },
        },
      ],
    });

    // Seventh step
    tour.addStep({
      id: "step-seventh",
      text: "This is the seventh step - choose an Instance Type.",
      attachTo: {
        element: "#seventhStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => tour.show("step-sixth"),
        },
        {
          text: "Next",
          action: () => {
            handleFieldClick("instanceType");
            tour.show("step-eight");
          },
        },
      ],
    });
    // eight step
    tour.addStep({
      id: "step-eight",
      text: "This is the eight step - give an Instance name.",
      attachTo: {
        element: "#eightStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => tour.show("step-seventh"),
        },
        {
          text: "Next",
          action: () => {
            handleFieldClick("uuid");
            tour.show("step-nine");
          },
        },
      ],
    });
    // nine step
    tour.addStep({
      id: "step-nine",
      text: "This is the nine step - give an Instance name.",
      attachTo: {
        element: "#nineStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => tour.show("step-eight"),
        },
        {
          text: "Next",
          action: () => {
            handleFieldClick("pricingModel");
            tour.show("step-tenth");
          },
        },
      ],
    });
    // tenth step
    tour.addStep({
      id: "step-tenth",
      text: "This is the nine step - give an Instance name.",
      attachTo: {
        element: "#tenthStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => tour.show("step-nine"),
        },
        {
          text: "Next",
          action: () => {
            handleFieldClick("pricingModel");
            tour.show("step-eleventh");
          },
        },
      ],
    });
  }, []);
  return (
    <Box p={2} width="100%">
      <Grid item xs={12} md={3}>
        <Typography variant="body1" gutterBottom>
          Consumption Metadata
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <TextField
              id="sixthStepTarget"
              label={field.label}
              fullWidth
              value={state[field.name]}
              onClick={() => handleFieldClick(field.name)}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={1.2}>
          <Button
          id="seventhStepTarget"
            variant="contained"
            color="primary"
            size="small"
            onClick={() => dispatch(addInstance(response))}
          >
            <Add />
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={1.2}>
          <Button id="eightStepTarget" variant="contained" color="primary" size="small">
            <FileCopy />
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={1.2}>
          <AnimatedIconButton id="nineStepTarget" className={animate ? "animate" : ""}>
            <HelpOutlineIcon />
          </AnimatedIconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ConsumptionMetadata;
