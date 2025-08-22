import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

const spendData = [
  { name: "c6a.xlarge", cost: 5400 },
  { name: "Next 10", cost: 6988 },
  { name: "Rest", cost: 0 },
];

const businessValueData = [
  { name: "Current Spend", cost: 12300 },
  { name: "Hourly Cost Optimization", cost: 12100 },
  { name: "Modernize", cost: 7900 },
  { name: "Modernize & Downsize", cost: 7700 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1, bgcolor: "#222", color: "#fff" }}>
        <Typography variant="body2">
          <strong>{label}</strong>
        </Typography>
        <Typography variant="caption">
          Dummy Info: {payload[0].value}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const CostAdviceCharts = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Dollar Spend Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, bgcolor: "#1c1c1c" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "white" , textAlign: "center" , fontSize:"0.8rem"}}
            >
              Dollar Spend Distribution
            </Typography>
            <ResponsiveContainer width={350} height={300}>
                          <BarChart
                              width={400}
                              height={300}
                              data={spendData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                              barSize={50}
                          >
                              <XAxis
                                  dataKey="name"
                                  tick={{ fontSize: 12, fill: "#ccc" }} 
                                  axisLine={{ stroke: "#ccc" }}
                              />
                              <YAxis
                                  tick={{ fontSize: 12, fill: "#ccc" }}
                                   tickFormatter={(val) => `${val / 1000}k`} 
                                  axisLine={{ stroke: "#ccc" }}
                                  label={{ value: "Cost ($)", angle: -90, position: "insideLeft", fill: "#ccc" }}
                              />

                              {/* ✅ Remove grid lines */}
                              <CartesianGrid stroke="none" />

                             
                              <Tooltip
                                  cursor={{ fill: "transparent" }} 
                                  contentStyle={{ background: "#222", border: "none", color: "#fff" }}
                              />

                              <Bar dataKey="cost" fill="#999">
                                  <LabelList dataKey="cost" position="top" formatter={(v) => `${v / 1000}k`} style={{ fill: "white", fontSize: 10 }} />
                              </Bar>
                          </BarChart>

            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Business Value */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, bgcolor: "#1c1c1c" }}>
            <Typography
              variant="h6"
               sx={{ mb: 2, fontWeight: "bold", color: "white" , textAlign: "center" , fontSize:"0.8rem"}}
            >
              Business Value
            </Typography>
            <ResponsiveContainer width={450} height={300}>
                          <BarChart data={businessValueData} barSize={50}>
                              <CartesianGrid stroke="none" />
                              <XAxis
                                  dataKey="name"
                                  tick={{ fontSize: 8, fill: "#ccc" }}
                                  axisLine={{ stroke: "#ccc" }}
                              />
                              <YAxis
                                  tick={{ fontSize: 12, fill: "#ccc" }}
                                  tickFormatter={(val) => `${val / 1000}k`}
                                  axisLine={{ stroke: "#ccc" }}
                                  label={{ value: "Cost ($)", angle: -90, position: "insideLeft", fill: "#ccc" }}
                              />



                              <Tooltip
                                  cursor={{ fill: "transparent" }}
                                  content={<CustomTooltip />}
                                  contentStyle={{ background: "#222", border: "none", color: "#fff" }}
                              />



                              <Bar dataKey="cost">
                                  {businessValueData.map((entry, index) => (
                                      <Cell
                                          key={`cell-${index}`}
                                          fill={
                                              entry.name === "Current Spend" ? "#999" : "#4caf50"
                                          }
                                      />
                                  ))}
                                  <LabelList
                                      dataKey="cost"
                                      position="top"
                                      formatter={(val) => `${(val / 1000).toFixed(1)}k`}
                                      style={{ fill: "white", fontSize: 10 }}
                                  />
                              </Bar>
                          </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CostAdviceCharts;
