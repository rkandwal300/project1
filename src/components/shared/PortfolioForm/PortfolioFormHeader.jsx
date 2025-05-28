import React, { useEffect, useState, useRef } from "react";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
import FileUploadField from "./UploadInstances";
import CustomSelect from "./CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInstanceFormData,
  selectInstanceResponseName,
} from "@/redux/features/instance/instance.selector";
import tour from "@/tour/tour";
import ValidatedTextField from "@/components/ui/ValidatedTextField";
import { updateFormData } from "@/redux/features/instance/instance.slice";

function PortfolioFormHeader() {
  const dispatch = useDispatch();
  const formData = useSelector(selectInstanceFormData);
  const portfolioName = useSelector(selectInstanceResponseName);
  const [showSelfPerf, setShowSelfPerf] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const inputRef = useRef(null); 

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const pfName = formData.portfolioName;
  const handlePortfolioNameClick = () => {
    dispatch(updateFormData({ portfolioName }));
  };
  
  useEffect(() => {
    tour.removeStep("step-one");

    tour.addStep({
      id: "step-one",
      text: "Please enter a Portfolio Name before continuing.",
      attachTo: {
        element: "#portfolioName",
        on: "bottom",
      },
      buttons: [
        {
          text: "Next",
          action: () => {
            dispatch(updateFormData({ portfolioName }));
            tour.show("step-two");
          },
        },
      ],
    });

    tour.show("step-one");

    return () => {
      tour.removeStep("step-one");
    };
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid container spacing={2} justifyContent="space-between" width="100%">
        {/* Column Group 1 */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ValidatedTextField
                label="Portfolio Name"
                id="portfolioName"
                textFieldRef={inputRef}
                value={pfName}
                onClick={handlePortfolioNameClick}
                onChange={handlePortfolioNameClick}
                fullWidth
                // error={showHint}
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FileUploadField label="Upload Instances" />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showSelfPerf}
                    onChange={(e) => setShowSelfPerf(e.target.checked)}
                  />
                }
                label="Self Perf Assessment"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Column Group 2 */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {showSelfPerf && (
              <Grid item xs={12} md={6}>
                <FileUploadField label="Upload Self Perf assessment" />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <CustomSelect
                selectedValue={selectedValue}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PortfolioFormHeader;
