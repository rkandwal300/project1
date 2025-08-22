import React from "react";
import { Box, Typography, Chip  } from "@mui/material";
import CostAdvisaryCard from "./CostAdvisaryCard";
import InstanceAdvisaryCard from "./InstanceAdvisaryCard";
import RoomIcon from "@mui/icons-material/Room";

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




const CostAdvisaryCardList = ({ data, isCCa }) =>  {
  
   return(<Box container spacing={2} width={"100%"} overflow={"auto"}>
    <InstanceHeader />
  { data.map((val, idx) => <CostAdvisaryCard key={idx} item={val} isCCa={isCCa} page={`${idx+1} of ${data.length}`} />) }
</Box>
)}



export default CostAdvisaryCardList