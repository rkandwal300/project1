import React, { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import tour from "@/tour/tour";
import { useDispatch, useSelector } from "react-redux";
import { selectInstanceResponse } from "@/redux/features/instance/instance.selector";
import { updateFormData } from "@/redux/features/instance/instance.slice";

const FileUploadField = ({ label = "Upload File", ...props }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const response = useSelector(selectInstanceResponse);
  const [fileName, setFileName] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = () => {
    setIsFileUploaded(true);
    
    if (label == "Upload Self Perf assessment")
      dispatch(
        updateFormData({
          selfPrefAssessmentResponse: response.selfPrefAssessmentResponse,
        })
      );
    else dispatch(updateFormData(response));
    setFileName("Test Instance File");
  };

  const handleClick = () => {
    // fileInputRef.current?.click();
  };

  useEffect(() => {
    tour.removeStep("step-two");

    tour.addStep({
      id: "step-two",
      text: "Do you want to upload a file for prefilling the data.",
      attachTo: {
        element: "#uploadInstances",
        on: "bottom",
      },
      buttons: [
        {
          text: "Skip",
          action: () => tour.show("step-three"),
        },

        {
          text: "Next",
          disabled: !isFileUploaded,
          action: () => {
            tour.show("step-seventh");
          },
        },
      ],
    });

    tour.show("step-two");

    return () => {
      tour.removeStep("step-two");
    };
  }, [isFileUploaded]);
  return (
    <Box onClick={handleClick}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <TextField
        id="uploadInstances"
        label={label}
        value={fileName}
        onClick={handleFileChange}
        fullWidth
        required
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
        {...props}
      />
    </Box>
  );
};

export default FileUploadField;
