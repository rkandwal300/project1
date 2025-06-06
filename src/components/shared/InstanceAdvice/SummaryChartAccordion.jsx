import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import Plot from "react-plotly.js";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Plotly from "plotly.js-dist-min";

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

Object.entries(ICONS).forEach(([key, icon]) => {
  Plotly.Icons[`mdiFile${key.charAt(0).toUpperCase() + key.slice(1)}Box`] =
    icon;
});
 
const usePlotHeight = (height, ref) => {
  const [plotHeight, setPlotHeight] = useState(height);
  useEffect(() => {
    if (ref.current) {
      const titleHeight = ref.current.getBoundingClientRect().height;
      setPlotHeight(height - titleHeight);
    }
  }, [height, ref]);
  return plotHeight;
};

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

const getAnnotations = (labels, currentValues, optimalValues) =>
  labels.map((label, i) => {
    const base = currentValues[i];
    const rec = optimalValues[i];
    const diff = ((rec - base) / base) * 100;
    return {
      x: label,
      y: rec,
      text: `${Math.abs(diff.toFixed(2))}% ${diff < 0 ? "lower" : "higher"}`,
      showarrow: false,
      font: { color: "white", size: 12 },
    };
  });
 

const SummaryChartAccordion = ({ data, height = 300,pdfUrl,csvUrl }) => {


  const plotRef = useRef(null);
  const plotlyDivRef = useRef(null);
  const accordionRef = useRef(null);

  const plotHeight = usePlotHeight(height, accordionRef);
  const { labels, currentValues, optimalValues } = useChartData(data);


  const handleExportCSV = useCallback(() => {
    if (csvUrl) {
      const link = document.createElement("a");
      link.href = csvUrl;
      link.download =  `Summary.csv` ;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [csvUrl,]);

  const handleExportPDF = useCallback(async () => {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `Summary.pdf` ;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }, [pdfUrl, ]); 
  const annotations = useMemo(
    () => getAnnotations(labels, currentValues, optimalValues),
    [labels, currentValues, optimalValues]
  );
  
  const modeBarButtons = useMemo(
    () => [
      [
        {
          name: "Download plot as PNG",
          icon: Plotly.Icons.mdiFilePngBox,
          click: () => {
            if (plotRef.current) {
              Plotly.downloadImage(plotRef.current, {
                format: "png",
                filename: "summary-chart",
                width: 800,
                height: 600,
              });
            }
          },
        },
        {
          name: "Export as PDF",
          icon: Plotly.Icons.mdiFilePdfBox,
          click: handleExportPDF,
        },
        {
          name: "Export as CSV",
          icon: Plotly.Icons.mdiFileCsvBox,
          click: handleExportCSV,
        },
      ],
    ],
    [handleExportPDF, handleExportCSV]
  );

  return (
    <Box sx={{ width: "100%", minHeight: height, bgcolor: "#1e1e1e" }}>
      <Box sx={{ flexGrow: 1, height: plotHeight }}>
        <Plot
          ref={plotRef}
          onInitialized={(_, graphDiv) => {
            plotlyDivRef.current = graphDiv;
          }}
          data={[
            {
              x: labels,
              y: currentValues,
              name: "CI",
              type: "bar",
              marker: { color: "#1f77b4" },
            },
            {
              x: labels,
              y: optimalValues,
              name: "Optimal",
              type: "bar",
              marker: { color: "#ff7f0e" },
            },
          ]}
          layout={{
            title: {
              text: "Summary",
              font: { size: 18, color: "white" },
              x: 0.1,
              xanchor: "left",
            },
            barmode: "group",
            paper_bgcolor: "#1e1e1e",
            plot_bgcolor: "#1e1e1e",
            font: { color: "white" },
            annotations,
            margin: { l: 40, r: 20, t: 60, b: 40 },
          }}
          config={{
            displayModeBar: true,
            displaylogo: false,
            responsive: true,
            modeBarButtons,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Accordion sx={{ bgcolor: "#1e1e1e", color: "white" }}>
        <AccordionSummary
        id="summary-accordion-header"
          ref={accordionRef}
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
