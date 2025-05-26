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

const AnimatedIconButton = styled(IconButton)(( ) => ({
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

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 500); 

    return () => clearInterval(interval);  
  }, []);


  return (
    <Box p={2} width="100%">
      <Grid item xs={12} md={3}>
        <Typography variant="p" gutterBottom>
          Consumption Metadata
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {[
          "Max CPU %",
          "Max Mem",
          "Max Network BW",
          "Max Disk BW",
          "Max IOPS",
        ].map((label, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <TextField label={label} fullWidth />
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={1.2}>
          <Button variant="contained" color="primary" size="small">
            <Add />
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={1.2}>
          <Button variant="contained" color="primary" size="small">
            <FileCopy />
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={1.2}>
          <AnimatedIconButton className={animate ? "animate" : ""}>
            <HelpOutlineIcon />
          </AnimatedIconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ConsumptionMetadata;
