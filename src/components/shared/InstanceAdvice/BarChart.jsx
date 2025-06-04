import { useCallback, useMemo, useRef } from "react";
import Plot from "react-plotly.js";
import { useResizeDetector } from "react-resize-detector";
import Plotly from "plotly.js-dist-min";
// If you use jsPDF, import it:
import jsPDF from "jspdf";
import PropTypes from "prop-types";

const ICONS = {
  png: {
    width: 24,
    height: 24,
    path: "M 19 3 H 5 C 3.9 3 3 3.9 3 5 V 19 C 3 20.1 3.9 21 5 21 H 19 C 20.1 21 21 20.1 21 19 V 5 C 21 3.9 20.1 3 19 3 M 9 11.5 C 9 12.3 8.3 13 7.5 13 H 6.5 V 15 H 5 V 9 H 7.5 C 8.3 9 9 9.7 9 10.5 V 11.5 M 14 15 H 12.5 L 11.5 12.5 V 15 H 10 V 9 H 11.5 L 12.5 11.5 V 9 H 14 V 15 M 19 10.5 H 16.5 V 13.5 H 17.5 V 12 H 19 V 13.7 C 19 14.4 18.5 15 17.7 15 H 16.4 C 15.6 15 15.1 14.3 15.1 13.7 V 10.4 C 15 9.7 15.5 9 16.3 9 H 17.6 C 18.4 9 18.9 9.7 18.9 10.3 V 10.5 H 19 M 6.5 10.5 H 7.5 V 11.5 H 6.5 V 10.5 Z",
  },
  pdf: {
    width: 24,
    height: 24,
    path: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9.5 11.5C9.5 12.3 8.8 13 8 13H7V15H5.5V9H8C8.8 9 9.5 9.7 9.5 10.5V11.5M14.5 13.5C14.5 14.3 13.8 15 13 15H10.5V9H13C13.8 9 14.5 9.7 14.5 10.5V13.5M18.5 10.5H17V11.5H18.5V13H17V15H15.5V9H18.5V10.5M12 10.5H13V13.5H12V10.5M7 10.5H8V11.5H7V10.5Z",
  },
  csv: {
    width: 24,
    height: 24,
    path: "M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M15 16L13 20H10L12 16H9V11H15V16M13 9V3.5L18.5 9H13Z",
  },
};

// Plotly.Icons may not exist in plotly.js-dist-min, so we define icons inline below

const BarChart = ({
  title,
  currentValue,
  height,
  recommendations = [],
  yLabel,
  unit,
}) => {
  const plotRef = useRef(null);
  const { width, ref } = useResizeDetector();

  const labels = ["CI", "Optimal", "Best", "Good"];
  const values = [
    currentValue,
    recommendations[0]?.[yLabel],
    recommendations[1]?.[yLabel],
    recommendations[2]?.[yLabel],
  ];

  // Prepare CSV data
  const data = labels.map((label, idx) => ({
    label,
    value: values[idx],
  }));

  const handleExportCSV = useCallback(() => {
    const filename = title + ".csv";
    const headers = ["Label", "Value"];
    const rows = data.map((row) => [row.label, row.value]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [title, data]);

  const handleExportPDF = useCallback(async () => {
    if (!plotRef.current) return;
    try {
      const plotlyDiv = plotRef.current.el || plotRef.current; // .el for react-plotly.js >=2.5.0
      const imageData = await Plotly.toImage(plotlyDiv, {
        format: "png",
        width: 800,
        height: 600,
      });
      const pdf = new jsPDF("l", "pt", [800, 600]);
      pdf.addImage(imageData, "PNG", 0, 0, 800, 600);
      pdf.save(title + ".pdf");
    } catch (error) {
      console.error("PDF Export Error:", error);
    }
  }, []);

  const annotations = values.map((val, idx) => {
    if (idx === 0 || !val || !currentValue) return null;
    const diff = ((val - currentValue) / currentValue) * 100;
    const text = `${Math.abs(diff.toFixed(2))}% ${
      diff < 0 ? "lower" : "higher"
    }`;
    return {
      x: labels[idx],
      y: val,
      text,
      showarrow: false,
      font: { color: "white" },
    };
  });

  // Inline icons for modeBarButtons
  const modeBarButtons = useMemo(
    () => [
      [
        {
          name: "Download plot as PNG",
          icon: ICONS.png,
          click: () => {
            if (plotRef.current) {
              const plotlyDiv = plotRef.current.el || plotRef.current;
              Plotly.downloadImage(plotlyDiv, {
                format: "png",
                filename: title,
                width: 800,
                height: 600,
              });
            }
          },
        },
        {
          name: "Export as PDF",
          icon: ICONS.pdf,
          click: handleExportPDF,
        },
        {
          name: "Export as CSV",
          icon: ICONS.csv,
          click: handleExportCSV,
        },
      ],
    ],
    [handleExportPDF, title, handleExportCSV]
  );

  return (
    <div ref={ref} style={{ width: width }}>
      {width && (
        <Plot
          ref={plotRef}
          data={[
            {
              x: labels,
              y: values,
              type: "bar",
              marker: {
                color: ["gray", "dodgerblue", "dodgerblue", "dodgerblue"],
              },
            },
          ]}
          layout={{
            title: {
              text: `${title} (${unit})`,
              font: {
                color: "white",
                size: 16,
              },
              x: 0.1,
              xanchor: "left",
            },
            paper_bgcolor: "black",
            plot_bgcolor: "black",
            font: { color: "white" },
            annotations: annotations.filter(Boolean),
            width: width,
            height: height,
            margin: {
              l: 60,
              r: 30,
              t: 80,
              b: 40,
            },
          }}
          config={{
            displayModeBar: true,
            displaylogo: false,
            responsive: true,
            modeBarButtons,
          }}
        />
      )}
    </div>
  );
};
BarChart.propTypes = {
  title: PropTypes.string,
  currentValue: PropTypes.number,
  height: PropTypes.number.isRequired,
  recommendations: PropTypes.array,
  yLabel: PropTypes.string,
  unit: PropTypes.string,
};

export default BarChart;
