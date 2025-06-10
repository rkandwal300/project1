import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const BarChart = ({
  title,
  currentValue,
  recommendations,
  unit = "$",
  yLabel,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.Highcharts || !chartRef.current) return;

    const categories = ["CI", "Optimal", "Best", "Good"];
    const values = [
      currentValue,
      recommendations[0][yLabel],
      recommendations[1][yLabel],
      recommendations[2][yLabel],
    ];

    const base = values[0];

    const colors = ["#999", "#66c2ff", "#33bfff", "#0099ff"];
    const labels = values.map((val, i) => {
      if (i === 0) return null;
      const diff = val - base;
      const pct = ((diff / base) * 100).toFixed(2);
      return diff > 0 ? `${pct}% higher` : `${Math.abs(pct)}% lower`;
    });

    window.Highcharts.chart(chartRef.current, {
      chart: {
        type: "column",
        backgroundColor: "#111",
        height: 300,
      },
      title: {
        text: `${title} (${unit})`,
        style: {
          color: "#fff",
          fontWeight: 400,
        },
        align: "left",
        x: 0,
      },
      xAxis: {
        categories,
        labels: {
          style: { color: "#fff" },
        },
      },
      yAxis: {
        title: null,
        labels: {
          style: { color: "#fff" },
        },
        gridLineColor: "#333",
      },
      tooltip: {
        formatter: function () {
          return `<b>${categories[this.point.index]}:</b> ${this.y.toFixed(
            2
          )} ${unit}`;
        },
        backgroundColor: "#222",
        style: { color: "#fff" },
      },
      plotOptions: {
        column: {
          colorByPoint: true,
          colors,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return labels[this.point.index] || "";
            },
            style: {
              color: "#fff",
              fontWeight: 400,
              textOutline: "none",
            },
          },
        },
      },
      series: [
        {
          name: title,
          data: values.map((val, i) => ({
            y: val,
            label: labels[i],
          })),
        },
      ],
      legend: { enabled: false },

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
        fallbackToExportServer: false, //TODO: Disable export server this will be enabled in production
        url: null, // TODO: Disable export server this will be enabled in production
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

  //   setTimeout(() => {
  //   const items = document.querySelectorAll(
  //     '.highcharts-menu li'
  //   );
  //   const tooltips = [
  //     "Download as PNG", 
  //     "Download as PDF",
  //     "Download as CSV",
  //   ];

  //   items.forEach((item, i) => {
  //     item.setAttribute("title", tooltips[i]);
  //   });
  // }, 500);
  }, [title, currentValue, recommendations, unit, yLabel]);

  return <div ref={chartRef} />;
};

export default BarChart;
BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      cost: PropTypes.number,
      power: PropTypes.number,
      carbon: PropTypes.number,
      perf: PropTypes.number,
      monthlySavings: PropTypes.number,
      vCPU: PropTypes.number,
    })
  ).isRequired,
  unit: PropTypes.string,
  yLabel: PropTypes.string.isRequired,
};
