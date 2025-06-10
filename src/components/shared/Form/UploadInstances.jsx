import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import HoverInput from "@/components/ui/form/Input";
import { Box, InputAdornment, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { mockFormDataResponse } from "@/lib/data";
import {
  addInstanceList,
  addSelfAssessmentList,
} from "@/redux/features/instance/instance.slice";
import { useWatch } from "react-hook-form";

const TOOLTIP_MESSAGES = {
  "Upload Self Perf assessment": "Upload file for metrics",
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
  const fileName = label === "Upload Self Perf assessment" ? selfPrefFile : instanceFile;
  const isFileUploaded = useWatch({
    control: form.control,
    name: "isFileUploaded",
    defaultValue: "",
  }); 

  const handleInputClick = () => {
    console.log("File upload clicked for label:", label);
    form.setValue("isFileUploaded", true);
    if (label === "Upload Self Perf assessment") {
      dispatch(
        addSelfAssessmentList([
          {
            instanceType: "m5a.12xLarge",
            saps: 145230,
          },
        ])
      );
      form.setValue("selfPrefFile", "Self Pref File");
    } else {
      dispatch(addInstanceList([mockFormDataResponse]));
      form.setValue("instanceFile", "Test Instance File");
    }
  };

  useEffect(() => {
    if (!fileName && !isFileUploaded) return;
    const timeout = setTimeout(() => {
      form.setValue("isFileUploaded", false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [fileName, isFileUploaded, form]);

  return (
    <Box maxWidth={"268px"}>
      <HoverInput
        tooltipMessage={getTooltipMessage(label)}
        label={label}
        value={fileName}
        onClick={handleInputClick}
        onClear={() => {
          form.setValue("fileName", "");
          form.setValue("isFileUploaded", false);
        }}
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <AttachFileOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        name={props?.name ?? props?.id}
        {...props}
      />
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
