import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTheme, useMediaQuery } from "@mui/material";
import BarChart from "./BarChart";
import SummaryChartAccordion from "./SummaryChartAccordion";

const Dashboard = ({ data }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setContainerWidth(width);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, isMd]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMd ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
    gap: "px",
    padding: 16,
  };

  const chartItems = [
    {
      title: "Cost",
      value: data.currentPlatform.cost,
      yLabel: "cost",
      unit: "$",
    },
    {
      title: "Power",
      value: data.currentPlatform.power,
      yLabel: "power",
      unit: "kW",
    },
    {
      title: "Carbon",
      value: data.currentPlatform.carbon,
      yLabel: "carbon",
      unit: "kgCO₂eq",
    },
  ];

  const chartWidth = isMd ? containerWidth / 4 - 24 : containerWidth;
  const height = 300;
  return (
    <div ref={containerRef} style={gridStyle}>
      {chartItems.map((item) => (
        <div key={item.value} style={{ width: chartWidth }}>
          <BarChart
            width={chartWidth}
            title={item.title}
            currentValue={item.value}
            recommendations={data.recommendations}
            yLabel={item.yLabel}
            unit={item.unit}
            height={height}
          />
        </div>
      ))}
      <div style={{ width: chartWidth }}>
        <SummaryChartAccordion data={data} height={height} width={chartWidth} />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  data: PropTypes.shape({
    currentPlatform: PropTypes.shape({
      cost: PropTypes.number.isRequired,
      power: PropTypes.number.isRequired,
      carbon: PropTypes.number.isRequired,
    }).isRequired,
    recommendations: PropTypes.array.isRequired,
  }).isRequired,
};

export default Dashboard;
