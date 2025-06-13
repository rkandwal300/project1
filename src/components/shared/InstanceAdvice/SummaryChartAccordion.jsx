import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo } from "react";


const useChartData = (data) => {
  const labels = useMemo(() => ["Cost", "Power", "Carbon"], []);
  const currentValues = useMemo(
    () => [
      data.currentPlatform.cost,
      data.currentPlatform.power,
      data.currentPlatform.carbon,
    ],
    [data]
  );
  const optimalValues = useMemo(
    () => [
      data.recommendations[0]?.cost || 0,
      data.recommendations[0]?.power || 0,
      data.recommendations[0]?.carbon || 0,
    ],
    [data]
  );
  return { labels, currentValues, optimalValues };
};

const SummaryChartAccordion = ({ data, height = 300 }) => {
  const chartRef = useRef(null);
  const summaryRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(0);
    const { labels, currentValues, optimalValues } = useChartData(data);


  useEffect(() => {
    if (summaryRef.current) {
      setChartHeight(Math.max(height - summaryRef.current.offsetHeight, 100));
    }
  }, [height]);

  useEffect(() => {
    if (!window.Highcharts || !chartRef.current) return;

    const Highcharts = window.Highcharts;
    const categories = ["Cost", "Power", "Carbon"];

    const ci = data.currentPlatform;
    const optimal = data.recommendations[0];

    const ciValues = [ci.cost, ci.power, ci.carbon];
    const optimalValues = [optimal.cost, optimal.power, optimal.carbon];

    const barSeries = [
      {
        name: "CI",
        data: ciValues,
        color: "#1E90FF",
      },
      {
        name: "Optimal",
        data: optimalValues,
        color: "#FFA500",
      },
    ];

    const lineSeries = ciValues.map((val, i) => {
      const optVal = optimalValues[i];
      const diff = optVal - val;
      const pct = ((diff / val) * 100).toFixed(2);

      return {
        type: "line",
        name: null,
        data: [
          [i - 0.2, val],
          [i + 0.2, optVal],
        ],
        color: "#aaa",
        marker: { enabled: false },
        enableMouseTracking: false,
        dataLabels: {
          enabled: true,
          useHTML: true,
          formatter: function () {
            return `<span style="color: white">${
              pct > 0 ? "+" : ""
            }${pct}%</span>`;
          },
          align: "center",
          verticalAlign: "middle",
          style: { textOutline: "none" },
        },
        showInLegend: false,
      };
    });

    Highcharts.chart(chartRef.current, {
      chart: {
        type: "column",
        backgroundColor: "#111",
        height: chartHeight,
      },
      title: {
        text: "Summary",
        align: "left",
        style: { color: "#fff", fontWeight: 400 },
      },
      xAxis: {
        categories,
        labels: { style: { color: "#fff" } },
      },
      yAxis: {
        title: null,
        labels: { style: { color: "#fff" } },
        gridLineColor: "#444",
      },
      legend: {
        itemStyle: { color: "#ffff" },
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [...barSeries, ...lineSeries],
      credits: { enabled: false },
      navigation: {
        buttonOptions: {
          align: "right",
          verticalAlign: "top",
          y: 0,
        },
      },
      exporting: {
        enabled: true,
        fallbackToExportServer: false,
        url: null,
        buttons: {
          contextButton: {
            enabled: false,
          },
          exportCSV: {
            text: `<svg viewBox="0 0 24 24" class="icon" height="2em" width="2em" fill="#626262"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M15 16L13 20H10L12 16H9V11H15V16M13 9V3.5L18.5 9H13Z"></path></svg>`,
            useHTML: true,
            onclick: function () {
              this.downloadCSV();
            },
            x: 0,
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "transparent",
                },
              },
            },
          },
          exportPDF: {
            text: `<svg viewBox="0 0 24 24" class="icon" height="2em" width="2em" fill="#626262"><path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9.5 11.5C9.5 12.3 8.8 13 8 13H7V15H5.5V9H8C8.8 9 9.5 9.7 9.5 10.5V11.5M14.5 13.5C14.5 14.3 13.8 15 13 15H10.5V9H13C13.8 9 14.5 9.7 14.5 10.5V13.5M18.5 10.5H17V11.5H18.5V13H17V15H15.5V9H18.5V10.5M12 10.5H13V13.5H12V10.5M7 10.5H8V11.5H7V10.5Z"></path></svg>`,
            useHTML: true,
            onclick: function () {
              this.exportChartLocal({ type: "application/pdf" });
            },
            x: -25,
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "transparent",
                },
              },
            },
          },
          exportPNG: {
            text: `<svg viewBox="0 0 24 24" class="icon" height="2em" width="2em" fill="#626262"><path d="M 19 3 H 5 C 3.9 3 3 3.9 3 5 V 19 C 3 20.1 3.9 21 5 21 H 19 C 20.1 21 21 20.1 21 19 V 5 C 21 3.9 20.1 3 19 3 M 9 11.5 C 9 12.3 8.3 13 7.5 13 H 6.5 V 15 H 5 V 9 H 7.5 C 8.3 9 9 9.7 9 10.5 V 11.5 M 14 15 H 12.5 L 11.5 12.5 V 15 H 10 V 9 H 11.5 L 12.5 11.5 V 9 H 14 V 15 M 19 10.5 H 16.5 V 13.5 H 17.5 V 12 H 19 V 13.7 C 19 14.4 18.5 15 17.7 15 H 16.4 C 15.6 15 15.1 14.3 15.1 13.7 V 10.4 C 15 9.7 15.5 9 16.3 9 H 17.6 C 18.4 9 18.9 9.7 18.9 10.3 V 10.5 H 19 M 6.5 10.5 H 7.5 V 11.5 H 6.5 V 10.5 Z"></path></svg>`,
            useHTML: true,
            onclick: function () {
              this.exportChartLocal({ type: "image/png" });
            },
            x: -50,
            theme: {
              fill: "transparent",
              states: {
                hover: {
                  fill: "transparent",
                },
              },
            },
          },
        },
      },
    });
  }, [data, height, chartHeight]); 
  return (
    <Box sx={{ width: "100%", minHeight: height, bgcolor: "#1e1e1e" }}>
      
        <div ref={chartRef} style={{ height: "100%" }} />
      

      <Accordion sx={{ bgcolor: "#1e1e1e", color: "white" }}>
        <AccordionSummary
          id="summary-accordion-header"
          ref={summaryRef}
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography variant="h6">Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {labels.map((label, i) => {
              const base = currentValues[i];
              const value = optimalValues[i];
              const diff = ((base - value) / base) * 100;
              return (
                <li key={label}>
                  <Typography variant="body2">
                    {label}: {value.toFixed(2)} ({Math.abs(diff).toFixed(2)}%){" "}
                    {diff > 0 ? "lower" : "higher"}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SummaryChartAccordion;
