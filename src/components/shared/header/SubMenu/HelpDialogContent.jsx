//  HelpDialogContent
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
export default function HelpDialogContent({ onClose }) {
  return (
    <Box sx={{ p: 0 }} gap={0}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Manage Portfolio
        </Typography>

        {/* Close Button */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box p={2} overflow={"auto"} maxHeight="70vh">
        {/* Intro Paragraph */}
        <Typography mt={2}>
          Welcome to EPYC Cloud Instance Advisor application. EIA is a powerful
          recommendation engine designed to analyze historical system statistics
          and provide optimal instance recommendations.
        </Typography>

        {/* Note */}
        <Typography mt={2}>
          <strong>Note:</strong> All your actions and available features will be
          based on your assigned role.
        </Typography>

        {/* Main Feature List */}
        <Typography mt={2}>
          The home page featuring tiles for different functionalities:
        </Typography>
        <List sx={{ listStyleType: "decimal", pl: 3 }} dense>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary={<strong>Stat Collector Download</strong>} />
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Release Notes: Click the (📄) icon to view the release notes." />
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Support: Click the (🎧) icon to reach out for help." />
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText
              primary={
                <>
                  Profile: Represented by the (👤) icon, displays the email ID
                  of the logged-in user. Also provides options to logout,
                  download the user guide, and view online documentation.
                </>
              }
            />
          </ListItem>
        </List>

        {/* Sub features */}
        <Typography mt={1}>
          <strong>Download User Guide:</strong> Click the (📘) icon to download
          the EIA user guide.
        </Typography>
        <Typography>
          <strong>Online Documentation:</strong> Click the (?) icon for
          on-screen instructions and page info.
        </Typography>
        <Typography>
          <strong>About:</strong> Click the (ℹ️) icon to view an overview of the
          application.
        </Typography>
        <Typography>
          <strong>Log out:</strong> Click the (🔚) icon and select the {' "'}
          <strong>Logout</strong>{'" '} option.
        </Typography>

        {/* Stat Collector Steps */}
        <Typography variant="h6" mt={3} fontWeight={"bold"} gutterBottom>
          Stat Collector:
        </Typography>
        <List sx={{ listStyleType: "decimal", pl: 3 }} dense>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Click on 'Download Stat Collector' to download the `stat_collector.zip` file" />
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Execute the stat collector to obtain the XLSX file for upload. For execution steps, refer to the user guide." />
          </ListItem>
        </List>
        {/*Downloads Steps */}
        <Typography variant="h6" mt={3} fontWeight={"bold"} gutterBottom>
          Downloads:
        </Typography>
        <List sx={{ listStyleType: "decimal", pl: 3 }} dense>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="This section provides options to download the templates, allowing you to update the details manually for the upload." />
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="You will see options to download templates for Instance Details and Self-Perf Assessment." />
            <Typography display={'flex'} gap="2px"> 
              <strong>Note :</strong>{" "}
              <ListItemText primary=" The Self-Perf Template is optional and can be filled out if applicable." />
            </Typography>{" "}
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

HelpDialogContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};