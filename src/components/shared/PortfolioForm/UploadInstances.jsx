import React, { useRef, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const FileUploadField = ({ label = "Upload File" }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

return (
    <Box>
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
        />
        <TextField
            label={label}
            value={fileName}
            onClick={handleClick}
            fullWidth
            required
            
            slotProps={{
                input: {
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleClick}>
                                <AttachFileOutlinedIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    </Box>
);
};

export default FileUploadField;
