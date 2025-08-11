import React from "react";
import { Box, Grid } from "@mui/material";
import CostAdvisaryCard from "./CostAdvisaryCard";
import InstanceAdvisaryCard from "./InstanceAdvisaryCard";



const CostAdvisaryCardList = ({ data, isCCa }) => (<Box container spacing={2} width={"100%"} overflow={"auto"}>
  { data.map((val, idx) => <CostAdvisaryCard key={idx} item={val} isCCa={isCCa} page={`${idx+1} of ${data.length}`} />) }
</Box>
)



export default CostAdvisaryCardList