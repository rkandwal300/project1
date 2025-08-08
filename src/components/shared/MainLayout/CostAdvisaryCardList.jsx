// src/form/CostAdvisoryRecommendationGrid.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Grid,
  useTheme,
  Icon,
} from "@mui/material";
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import CostAdvisaryCard from "./CostAdvisaryCard";



export default function ({
  data,
}) {
  const theme = useTheme();
  console.log({ data: data[0] });
  return (
    <Grid container spacing={2}>
      {data.map((val, idx) => <CostAdvisaryCard key={idx} item={val} />)}
    </Grid>
  );
}


