// import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { useTheme, useMediaQuery } from "@mui/material";
// import BarChart from "./BarChart";
// import SummaryChartAccordion from "./SummaryChartAccordion";

// const Dashboard = ({ data }) => {
//   const theme = useTheme();
//   const isMd = useMediaQuery(theme.breakpoints.up("md"));

//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     const updateWidth = () => {
//       if (containerRef.current) {
//         const width = containerRef.current.getBoundingClientRect().width;
//         setContainerWidth(width);
//       }
//     };

//     updateWidth();

//     const resizeObserver = new ResizeObserver(updateWidth);
//     resizeObserver.observe(containerRef.current);

//     return () => {
//       resizeObserver.disconnect();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [containerRef.current, isMd]);

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: isMd ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
//     gap: "px",
//     padding: 16,
//   };

//   const chartItems = [
//     {
//       title: "Cost",
//       value: data.currentPlatform.cost,
//       yLabel: "cost",
//       unit: "$",
//       pdfUrl: "/Cost.pdf",
//       csvUrl: "/Cost.csv",
//     },
//     {
//       title: "Power",
//       value: data.currentPlatform.power,
//       yLabel: "power",
//       unit: "kW",
//       pdfUrl: "/Power.pdf",
//       csvUrl: "/Power.csv",
//     },
//     {
//       title: "Carbon",
//       value: data.currentPlatform.carbon,
//       yLabel: "carbon",
//       unit: "kgCO₂eq",
//       pdfUrl: "/Carbon.pdf",
//       csvUrl: "/Carbon.csv",
//     },
//   ];

//   const chartWidth = isMd ? containerWidth / 4 - 24 : containerWidth;
//   const height = 300;
//   return (
//     <div ref={containerRef} style={gridStyle}>
//       {chartItems.map((item) => (
//         <div key={item.value} style={{ width: chartWidth }}>
//           <BarChart
//             width={chartWidth}
//             title={item.title}
//             currentValue={item.value}
//             recommendations={data.recommendations}
//             yLabel={item.yLabel}
//             unit={item.unit}
//             height={height}
//             csvUrl={item.csvUrl}
//             pdfUrl={item.pdfUrl}
//           />
//         </div>
//       ))}
//       <div style={{ width: chartWidth }}>
//         <SummaryChartAccordion
//           data={data}
//           height={height}
//           width={chartWidth}
//           pdfUrl="/Advice_aws_test_Summary.pdf"
//           csvUrl="/Advice_aws_test_Summary.csv"
//         />
//       </div>
//     </div>
//   );
// };

// Dashboard.propTypes = {
//   data: PropTypes.shape({
//     currentPlatform: PropTypes.shape({
//       cost: PropTypes.number.isRequired,
//       power: PropTypes.number.isRequired,
//       carbon: PropTypes.number.isRequired,
//     }).isRequired,
//     recommendations: PropTypes.array.isRequired,
//   }).isRequired,
// };

// export default Dashboard;
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTheme, useMediaQuery } from "@mui/material";
import BarChart from "./BarChart"; // <- updated name

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

    return () => resizeObserver.disconnect();
  }, [isMd]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMd ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
    gap: "16px",
    padding: 16,
  };

  const chartItems = [
    {
      title: "Cost",
      yLabel: "cost",
      unit: "$",
      data: [
        data.currentPlatform.cost,
        data.recommendations[0].cost,
        data.recommendations[1].cost,
        data.recommendations[2].cost,
      ],
    },
    {
      title: "Power",
      yLabel: "power",
      unit: "kW",
      data: [
        data.currentPlatform.power,
        data.recommendations[0].power,
        data.recommendations[1].power,
        data.recommendations[2].power,
      ],
    },
    {
      title: "Carbon",
      yLabel: "carbon",
      unit: "kgCO₂eq",
      data: [
        data.currentPlatform.carbon,
        data.recommendations[0].carbon,
        data.recommendations[1].carbon,
        data.recommendations[2].carbon,
      ],
    },
  ];

  return (
    <div ref={containerRef}>
      <div style={gridStyle}>
        {chartItems.map((item) => (
          <BarChart
            key={item.yLabel}
            title={item.title}
            yLabel={item.yLabel}
            unit={item.unit}
            data={item.data}
          />
        ))}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Dashboard;
