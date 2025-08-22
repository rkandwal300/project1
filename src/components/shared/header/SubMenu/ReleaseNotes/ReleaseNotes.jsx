import React from "react";
import Button from "@mui/material/Button"; 
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import CustomTable from "@/components/ui/table/CustomTable";
import { eiaReleaseNotesTableData } from "./ReleaseNotes.data";
import { ccaReleaseNotesTableData } from "./ReleaseNotes.data";
import { releaseNotesTableColumns } from "./releaseNotesTableColumns";
import PropTypes from "prop-types";

ReleaseNotes.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

function ReleaseNotes({ handleClose }) {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontSize: "1.17em",
          fontWeight: "bold",
          mt: 1,
          mb: 2,
          textAlign: "center",
        }}
      >
        Release Notes
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.95em",
          ml: "10px",
        }}
      >
        To access the latest features, please press{" "}
        <strong>Ctrl+Shift+R</strong> on your keyboard. This shortcut will
        refresh the application, ensuring that you are using the most up-to-date
        version with all the newest functionalities and improvements. It's a
        quick and easy way to make sure you're always working with the latest
        tools available.
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.95em",
          ml: "10px",
        }}
      >
        Get real-time insights into estimated cost savings when switching to
        cloud instances powered by AMD within the same Cloud Service
        Provider(CSP).
      </Typography>

      <Box sx={{ height: 345, overflowY: "auto", px: "12px" }}>
        <CustomTable
          variant="default"
          data={isCCA ? ccaReleaseNotesTableData : eiaReleaseNotesTableData}
          columns={releaseNotesTableColumns}
        />
      </Box>
      <Divider />
       
        <Button
          startIcon={<CloseIcon />}
          id="step-two-target"
          variant="contained"
          color="error"
          onClick={handleClose}
          sx={{
            width:'fit-content',
            margin:'8px',
            marginLeft: "auto",
          }}
        >
          Close
        </Button>
     
    </>
  );
}

export default ReleaseNotes;
