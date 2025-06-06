import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Divider, Typography, Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Dynamic imports for table and data
const releaseNotesTableColumnsPromise = import("./releaseNotesTableColumns").then(mod => mod.releaseNotesTableColumns);
const CustomTable = lazy(() => import("@/components/ui/table/CustomTable"));
const releaseNotesTableDataPromise = import("./ReleaseNotes.data").then(mod => mod.releaseNotesTableData);

ReleaseNotes.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

function ReleaseNotes({ handleClose }) {
  const [tableData, setTableData] = React.useState([]);
  const [tableColumns, setTableColumns] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    Promise.all([releaseNotesTableDataPromise, releaseNotesTableColumnsPromise]).then(
      ([data, columns]) => {
        if (mounted) {
          setTableData(data);
          setTableColumns(columns);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontSize: "1.17em", fontWeight: "bold" }}>
          Release Notes
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: "0.8em" }}>
          To access the latest features, please press
          <Typography component="span" sx={{ fontWeight: "bold", mx: 0.5 }}>
            Ctrl+Shift+R
          </Typography>
          on your keyboard. This shortcut will refresh application, ensuring
          that you are using the most up-to-date version with all the newest
          functionalities and improvements. It's a quick and easy way to make
          sure you're always working with the latest tools available.
        </Typography>
        <Suspense fallback={<div>Loading table...</div>}>
          <CustomTable
            variant="default"
            data={tableData}
            columns={tableColumns}
          />
        </Suspense>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          startIcon={<CloseIcon />}
          id="step-two-target"
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
