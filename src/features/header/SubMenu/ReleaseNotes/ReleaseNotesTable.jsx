import { BorderRight } from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";

function ReleaseNotesTable() {
    const themeColor = useTheme()
  const cellStyle = {
    border: "1px solid rgba(0, 0, 0, 0.3)",
    verticalAlign: "top",
    padding: 2,
  };
  const TableHeadStyle = {
    BorderRight: themeColor.palette.primary,
    BorderLeft: "1px solid  #d7d7d7",
    verticalAlign: "top",
    padding: 2,
     color: "#fff", fontWeight: "bold"
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#000" }}>
            <TableCell
              sx={{ ...TableHeadStyle, color: "#fff", fontWeight: "bold" }}
            >
              Version
            </TableCell>
            <TableCell
              sx={{ ...TableHeadStyle, color: "#fff", fontWeight: "bold" }}
            >
              Release Date
            </TableCell>
            <TableCell
              sx={{ ...TableHeadStyle, color: "#fff", fontWeight: "bold" }}
              align="center"
              colSpan={2}
            >
              What's New
            </TableCell>
            <TableCell sx={{ ...cellStyle, color: "#fff", fontWeight: "bold" }}>
              Upcoming / What's Next
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#000" }}>
            <TableCell sx={{ ...TableHeadStyle, color: "#fff", fontWeight: "bold" }}></TableCell>
            <TableCell              align="center"></TableCell>
            <TableCell
              sx={{ ...TableHeadStyle, color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              Major Features
            </TableCell>
            <TableCell
              sx={{ ...TableHeadStyle, color: "#fff", fontWeight: "bold" }}
              align="center"
            >
              Minor Improvements
            </TableCell>
            <TableCell  sx={{ ...TableHeadStyle, color: "#fff", fontWeight: "bold" }}
              align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={cellStyle}>v2.0.0</TableCell>
            <TableCell sx={cellStyle}>
              <Typography>Apr,</Typography>
              <Typography>2025</Typography>
            </TableCell>

            {/* Major Features */}
            <TableCell sx={cellStyle}>
              <Typography fontWeight="bold">
                Google Cloud Platform (GCP)
              </Typography>
              <ul>
                <li>
                  GCP support extended to include the US, UK, Netherlands, India
                  and Australia.
                </li>
              </ul>
              <Typography fontWeight="bold">Microsoft Azure</Typography>
              <ul>
                <li>
                  Azure is now supported across all countries and regions.
                </li>
              </ul>
              <Typography fontWeight="bold">Spot Instance Pricing</Typography>
              <ul>
                <li>
                  Support added for ‘Spot Instance’ pricing model enabling more
                  cost-effective recommendations.
                </li>
              </ul>
            </TableCell>

            {/* Minor Improvements */}
            <TableCell sx={cellStyle}>
              <Typography fontWeight="bold">Instance Advice Table</Typography>
              <ul>
                <li>
                  Current instance columns are now frozen in the instance advice
                  table for easier comparison with optimal, best and good
                  options.
                </li>
              </ul>
              <Typography fontWeight="bold">
                Telemetry Integration for GCP and Azure
              </Typography>
              <ul>
                <li>
                  GCP Datadog telemetry is included. It allows customers to link
                  their Datadog account with GCP VMs, eliminating the need to
                  export and upload data for cost analysis.
                </li>
              </ul>
            </TableCell>

            {/* Upcoming */}
            <TableCell sx={cellStyle}>
              <Typography fontWeight="bold">Telemetry Enhancements</Typography>
              <ul>
                <li>
                  Extended telemetry tool with AWS CloudWatch and Azure
                  Application Insights to further enhance data collection and
                  analysis.
                </li>
              </ul>
              <Typography fontWeight="bold">Expanded GCP Support:</Typography>
              <ul>
                <li>Full global coverage for all countries and regions.</li>
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReleaseNotesTable;
