import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import HoverInput from "@/components/ui/form/Input";
import { Box, InputAdornment, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState, useCallback, lazy } from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { mockFormDataResponse } from "@/lib/data";
import {
  addInstanceList,
  addSelfAssessmentList,
} from "@/redux/features/instance/instance.slice";

const Tour = lazy(() => import("@/tour/tour"));

const TOOLTIP_MESSAGES = {
  "Upload Self Perf assessment": "Upload file for metrics",
  "Upload Instances": "Upload file for Instances",
  default: "Click to upload a file",
};

const getTooltipMessage = (label) =>
  TOOLTIP_MESSAGES[label] || TOOLTIP_MESSAGES.default;

const FileUploadField = ({ label, ...props }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = useCallback(() => {
    setIsFileUploaded(true);

    if (label === "Upload Self Perf assessment") { 
      dispatch(
        addSelfAssessmentList([
          {
            instanceType: "m5a.12xLarge",
            saps: 145230,
          },
        ])
      );
      setFileName("Self Pref File");
    } else {
      dispatch(addInstanceList([mockFormDataResponse]));
      setFileName("Test Instance File");
    }
  }, [dispatch, label]);

  const handleClick = useCallback(() => {
    handleFileChange();
  }, [handleFileChange]);

  useEffect(() => {
    if (!fileName && !isFileUploaded) return;
    const timeout = setTimeout(() => {
      setIsFileUploaded(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [fileName, isFileUploaded]);

  return (
    <Box maxWidth={"268px"}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <HoverInput
        tooltipMessage={getTooltipMessage(label)}
        label={label}
        value={fileName}
        onClick={handleClick}
        onClear={() => {
          setFileName("");
          setIsFileUploaded(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = null; // Clear the file input
          }
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
};

export default React.memo(FileUploadField);
