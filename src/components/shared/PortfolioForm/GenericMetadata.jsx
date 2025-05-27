import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstanceFormData,
  selectInstanceResponse,
} from "@/redux/features/instance/instance.selector";
import tour from "@/tour/tour";
import { updateFormData } from "@/redux/features/instance/instance.slice";

const regions = ["af-south-1", "us-east-1", "us-west-1"];
const instanceTypes = [
  "a9caea33-6afd-461d-a1df-7c095a247455",
  "t2.micro",
  "t2.medium",
];
const pricingModels = ["ondemand", "reserved"];

function GenericMetadata() {
  const dispatch = useDispatch();
  const state = useSelector(selectInstanceFormData);
  const response = useSelector(selectInstanceResponse);

  const handleFieldClick = (field) => {
     
    if (!state[field]) {
      console.log({
        [field]: response[field],
      })
      dispatch(updateFormData({
        [field]: response[field],
      }));
    }
  };

  const handleChange = (field) => {
    if (!response[field]) {
      dispatch(updateFormData({
        [field]: response[field],
      }));
    }
  };

  useEffect(() => {
    // Second step
    tour.addStep({
      id: "step-three",
      text: "This is the three step.",
      attachTo: {
        element: "#thirdStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => {
            tour.show("step-two");
          },
        },
        {
          text: "Next",
          action: () => {
            console.log("Clicked region field");
            handleFieldClick("region");
            tour.show("step-four");
          },
        },
      ],
    });

    // Third step
    tour.addStep({
      id: "step-four",
      text: "This is the four step - choose an Instance Type.",
      attachTo: {
        element: "#fourthStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => tour.show("step-three"),
        },
        {
          text: "Next",
          action: () => {
            handleFieldClick("instanceType");
            tour.show("step-fifth");
          },
        },
      ],
    });
    // fifth step
    tour.addStep({
      id: "step-fifth",
      text: "This is the four step - give an Instance name.",
      attachTo: {
        element: "#fifthStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => tour.show("step-four"),
        },
        {
          text: "Next",
          action: () => {
            handleFieldClick("uuid");
            tour.show("step-sixth");
          },
        },
      ],
    });
    // sixth step
    tour.addStep({
      id: "step-sixth",
      text: "This is the four step - give an Instance name.",
      attachTo: {
        element: "#sixthStepTarget",
        on: "top",
      },
      buttons: [
        {
          text: "Back",
          action: () => tour.show("step-four"),
        },
        {
          text: "Next",
          action: () => {
            handleFieldClick("pricingModel");
            tour.show("step-sixth");
          },
        },
      ],
    });
  }, []);

  return (
    <Box p={2} width="100%">
      <Grid container spacing={2}>
        {/* Header */}
        <Grid item xs={12} md={3}>
          <Typography variant="body1" gutterBottom>
            Generic Metadata
          </Typography>
        </Grid>

        {/* Region */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth required>
            <InputLabel>Region</InputLabel>
            <Select
              id="thirdStepTarget"
              label="Region"
              value={state.region}
              onClick={() => handleFieldClick("region")}
              onChange={() => handleChange("region")}
            >
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Instance Type */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Instance Type</InputLabel>
            <Select
              id="fourthStepTarget"
              label="Instance Type"
              value={state.instanceType}
              onClick={() => handleFieldClick("instanceType")}
              onChange={() => handleChange("instanceType")}
            >
              {instanceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* UUID */}
        <Grid item xs={12} md={3}>
          <TextField
            id="fifthStepTarget"
            label="UUID/Instance Name"
            fullWidth
            value={state.uuid}
            onClick={() => handleFieldClick("uuid")}
            onChange={() => handleChange("uuid")}
          />
        </Grid>

        {/* Pricing Model */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Pricing Model</InputLabel>
            <Select
              id="sixthStepTarget"
              label="Pricing Model"
              value={state.pricingModel}
              onClick={() => handleFieldClick("pricingModel")}
              onChange={() => handleChange("pricingModel")}
            >
              {pricingModels.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GenericMetadata;
