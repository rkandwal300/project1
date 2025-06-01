import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Box, InputAdornment, IconButton } from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { useDispatch } from "react-redux";
import {
  addSelfAssessment,
  mockFormDataResponse,
  uploadInstance,
} from "@/redux/features/form/formData.slice";
import HoverInput from "@/components/ui/form/Input";

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
      console.log("Uploading self assessment data");
      dispatch(
        addSelfAssessment([
          {
            instanceType: "m5a.12xLarge",
            saps: 145230,
          },
        ])
      );
    } else {
      dispatch(uploadInstance([mockFormDataResponse]));
    }
    setFileName("Test Instance File");
  }, [dispatch, label]);

  // Open file dialog
  const handleClick = useCallback(() => { 
    handleFileChange();
  }, []);

   
  useEffect(() => {
    if (!fileName && !isFileUploaded) return;
    const timeout = setTimeout(() => {
      setFileName("");
      setIsFileUploaded(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [fileName, isFileUploaded]);

  return (
    <Box>
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
      {/* Uncomment below if you want to render Tour component */}
      {/* <Suspense fallback={null}>
        <Tour />
      </Suspense> */}
    </Box>
  );
};

export default React.memo(FileUploadField);
