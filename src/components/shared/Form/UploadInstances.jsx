import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import React, { useEffect } from "react";
import { mockFormDataResponse } from "@/lib/data";
import {
  addInstanceList,
  addSelfAssessmentList,
} from "@/redux/features/instance/instance.slice";
import { useWatch } from "react-hook-form";
import HoverComponent from "@/components/ui/form/HoverComponent";

const TOOLTIP_MESSAGES = {
  "Upload self perf assessment": "Upload file for metrics",
  "Upload Instances": "Upload file for Instances",
  default: "Click to upload a file",
};

const getTooltipMessage = (label) =>
  TOOLTIP_MESSAGES[label] || TOOLTIP_MESSAGES.default;

const FileUploadField = ({ label, form, ...props }) => {
  const dispatch = useDispatch();

  const selfPrefFile = useWatch({
    control: form.control,
    name: "selfPrefFile",
    defaultValue: "",
  });

  const instanceFile = useWatch({
    control: form.control,
    name: "instanceFile",
    defaultValue: "",
  });

  const fileName =
    label === "Upload self perf assessment" ? selfPrefFile : instanceFile;

   
  // Clear filename when form value changes externally
  useEffect(() => {
    if (
      (label === "Upload self perf assessment" && !selfPrefFile) ||
      (label !== "Upload self perf assessment" && !instanceFile)
    ) {
      form.setValue("isFileUploaded", false);
    }
    // eslint-disable-next-line
  }, [selfPrefFile, instanceFile]);

  const handleInputClick = () => {
    form.setValue("isFileUploaded", true);
    if (label === "Upload self perf assessment") {
      dispatch(
        addSelfAssessmentList([
          {
            instanceType: "m5a.12xLarge",
            saps: 145230,
          },
        ])
      );
      form.setValue("selfPrefFile", "Self Perf File");
    } else {
      dispatch(addInstanceList([mockFormDataResponse]));
      form.setValue("instanceFile", "Test Instance File");
    }
  };

  // Clear filename handler
  const handleClear = () => {
    if (label === "Upload self perf assessment") {
      form.setValue("selfPrefFile", "");
    } else {
      form.setValue("instanceFile", "");
    }
    form.setValue("isFileUploaded", false);
  };

  return (
    <Box maxWidth="268px">
      <FormControl fullWidth>
        <InputLabel shrink={!!fileName}  sx={{
    // Only apply when label is not shrunk
    ...(!fileName && {
      top: '50%',
      transform: 'translate(14px, -50%) scale(1)',
      fontSize: '0.875rem',
    }),
  }}>{label}</InputLabel>

        <HoverComponent
          tooltipMessage={getTooltipMessage(label)}
          value={fileName}
          onClear={handleClear}
        >
          <OutlinedInput
            notched={!!fileName}
            label={label}
            inputProps={{ readOnly: true }}
            endAdornment={null}
            name={props?.name ?? props?.id}
            value=""
            style={{ height: "40px" }}
            onClick={handleInputClick}
            startAdornment={
              fileName ? (
                <Chip
                  label={fileName}
                  size="small"
                  sx={{
                    ml: 0.5,
                    height: "20px",
                    fontSize: "0.625rem",
                  }}
                />
              ) : null
            }
            {...props}
          />
        </HoverComponent>
      </FormControl>
    </Box>
  );
};

FileUploadField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  form: PropTypes.object.isRequired,
};

export default React.memo(FileUploadField);
