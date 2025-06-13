import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { dataDogSchema } from "@/lib/validation/dataDog.schema";

 
const inputStyle = { fontWeight: 600 };

function TelemetryForm() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAppKey, setShowAppKey] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dataDogSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ backgroundColor: "white", p: 2, width: "100%" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(7, 1fr)" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          label="Portfolio Name"
          variant="outlined"
          fullWidth
          required
          {...register("portfolioName")}
          // error={!!errors.portfolioName}
          // helperText={errors.portfolioName?.message}
          sx={{ gridColumn: "span 3" }}
          InputProps={{ style: inputStyle }}
        />

        <TextField
          label="Regions"
          variant="outlined"
          fullWidth
          required
          {...register("regions")}
          // error={!!errors.regions}
          // helperText={errors.regions?.message}
          sx={{ gridColumn: "span 3" }}
          InputProps={{
            style: inputStyle,
            startAdornment: <Chip label="af-south-1" sx={{ mr: 0.5 }} />,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "repeat(7, 1fr)" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          label="API key"
          type={showApiKey ? "text" : "password"}
          inputMode="text"
          autoComplete="new-password"
          variant="outlined"
          fullWidth
          required
          {...register("apiKey")}
          // error={!!errors.apiKey}
          // helperText={errors.apiKey?.message}
          sx={{ gridColumn: "span 2" }}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowApiKey((prev) => !prev)}
                >
                  {showApiKey ? (
                    <VisibilityIcon sx={{ color: "black", fontSize: 19 }} />
                  ) : (
                    <VisibilityOffIcon sx={{ color: "black", fontSize: 19 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Application Key"
          type={showAppKey ? "text" : "password"}
          inputMode="text"
          autoComplete="new-password"
          variant="outlined"
          fullWidth
          required
          {...register("appKey")}
          // error={!!errors.appKey}
          // helperText={errors.appKey?.message}
          sx={{ gridColumn: "span 2" }}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowAppKey((prev) => !prev)}
                >
                  {showAppKey ? (
                    <VisibilityIcon sx={{ color: "black", fontSize: 19 }} />
                  ) : (
                    <VisibilityOffIcon sx={{ color: "black", fontSize: 19 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Host Tag"
          type="text"
          variant="outlined"
          fullWidth
          required
          {...register("hostTag")}
          // error={!!errors.hostTag}
          // helperText={errors.hostTag?.message}
          sx={{ gridColumn: "span 2" }}
          InputProps={{ style: inputStyle }}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ gridColumn: "span 1", textTransform: "none" }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Test Connection
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default TelemetryForm;
