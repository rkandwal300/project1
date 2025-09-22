import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import CostAdvisaryCard from "./CostAdvisaryCard";
import InstanceAdvisaryCard from "./InstanceAdvisaryCard";
import RoomIcon from "@mui/icons-material/Room";
import AutorenewIcon from '@mui/icons-material/Autorenew';

function InstanceHeader() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1.5}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "6px",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <RoomIcon sx={{ fontSize: "1.1rem", color: "#e91e63" }} />
        <Typography fontWeight={600} fontSize="0.9rem">
          af-south-1
        </Typography>
      </Box>

      <Chip
        label="4 instance"
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: "0.7rem",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      />
    </Box>
  );
}

function InstanceFooter(data) {
  return (
     <Box
        display="flex"
        alignItems="center"
        gap={2}           
        mt={1}            
      >
        <Typography fontWeight={600} fontSize="0.9rem" sx={{ color: "#666" }}>
          Showing {data.length} of {data.length} entries
        </Typography>

        <Button
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            maxWidth: 150,
            px: 2,
          }}
        >
          LOAD MORE <AutorenewIcon fontSize="medium" />
        </Button>
      </Box>
  );
}




const CostAdvisaryCardList = ({ data, isCCa }) => {

  return (
    <Box
      display="flex"
      flexDirection="column"   // or "row" if you want them side by side
      gap={2}                  // MUI spacing scale → theme.spacing(2)
      width="100%"
      overflow="auto"
      alignItems={"center"}
    >
      {data.map((val, idx) => (
        <CostAdvisaryCard
          key={idx}
          item={val}
          isCCa={isCCa}
          page={`${idx + 1} of ${data.length}`}
        />
      ))}
      <InstanceFooter data = {data} />
    </Box>

  )
}



export default CostAdvisaryCardList