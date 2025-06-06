import React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Typography } from "@mui/material";
import CustomTable from "@/components/ui/table/CustomTable";
import { releaseNotesTableData } from "./ReleaseNotes.data";
import { releaseNotesTableColumns } from "./releaseNotesTableColumns";
import PropTypes from "prop-types";

ReleaseNotes.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

function ReleaseNotes({ handleClose }) {
  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.17em",
            fontWeight: "bold",
          }}
        >
          Release Notes
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="p"
          sx={{
            fontSize: "0.8em",
          }}
        >
          To access the latest features, please press
          <Typography
            variant="b"
            sx={{
              fontWeight: "bold",
            }}
          >
            Ctrl+Shift+R
          </Typography>{" "}
          on your keyboard. This shortcut will refresh application, ensuring
          that you are using the most up-to-date version with all the newest
          functionalities and improvements. It's a quick and easy way to make
          sure you're always working with the latest tools available.
        </Typography>
        {/* <ReleaseNotesTable /> */}
        <CustomTable
          variant="default"
          data={releaseNotesTableData}
          columns={releaseNotesTableColumns}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          startIcon={<CloseIcon />}
          id={'step-two-target'}
          variant="contained"
          color="error"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
}

export default ReleaseNotes;
