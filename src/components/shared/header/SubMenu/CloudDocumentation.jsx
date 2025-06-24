//  CloudDocumentation
import React from 'react';
import { Box, Typography,  List, ListItem, ListItemText } from '@mui/material';
import {
  DescriptionOutlined,
  Headset,
  AccountCircle,
  Book,
  HelpOutline,
  InfoOutlined,
  Logout, 
  AddCircle,
  Delete
} from '@mui/icons-material';

const CloudDocumentation = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography  >
        Welcome to EPYC Cloud Instance Advisor application. EIA is a powerful recommendation engine designed to analyze historical system statistics and provide optimal instance recommendations.
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Note:</b> All your actions and available features will be based on your assigned role.
      </Typography>

      <Typography sx={{ mt: 2, ml: 2, mb: 1 }}>The home page featuring tiles for different functionalities:</Typography>
      <Box sx={{ ml: 7 }}>
        <List type="number">
          <ListItem>
            <ListItemText primary={<b>Stat Collector Download</b>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<><b>Release Notes:</b> Click the (<DescriptionOutlined fontSize="small" />) icon to view the release notes.</>} />
          </ListItem>
          <ListItem>
            <ListItemText primary={<><b>Support:</b> Click the (<Headset fontSize="small" />) icon for assistance.</>} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <b>Profile:</b> (<AccountCircle fontSize="small" />) displays email ID, logout, user guide, and documentation.
                  <br /><b>Download User Guide:</b> (<Book fontSize="small" />)
                  <br /><b>Online Documentation:</b> (<HelpOutline fontSize="small" />)
                  <br /><b>About:</b> (<InfoOutlined fontSize="small" />)
                  <br /><b>Log out:</b> (<Logout fontSize="small" />)
                </>
              }
            />
          </ListItem>
        </List>
      </Box>

      <Section title="Stat Collector" items={[
        "Click on 'Download Stat Collector' to download the stat_collector.zip file",
        "Execute the stat collector to obtain the XLSX file for upload. For execution steps, refer to the user guide."
      ]} />

      <Section title="Downloads" items={[
        "Download templates to manually update instance details.",
        "Instance Details and Self-Perf Assessment templates are available. Note: Self-Perf Template is optional."
      ]} />

      <Section title="Upload Instances" items={[
        "Click Upload Instances.",
        "Upload XLSX files.",
        "Errors will be displayed. Double-click fields to correct.",
        "Uploaded instances appear under 'Instance Stats'."
      ]} />

      <Section title="Upload Self-Perf Assessment" items={[
        "Check box to enable upload field.",
        "Click Upload Self-Perf Assessment.",
        "Browse and upload XLSX files.",
        "Click Open to submit."
      ]} />

      <Section title="Find & Replace" items={[
        "Click (<FileReplace fontSize='small' />) to fix errors.",
        "Use 'From' and 'To' dropdowns under Instance Type and Region tabs.",
        "Click Replace All to apply changes.",
        "'From' shows current values; 'To' shows available replacements."
      ]} />

      <Section title="Adding Instances Individually" items={[
        <><b>Select Cloud Service Provider:</b> Choose AWS, AZURE, GCP.</>,
        <><b>Enter Portfolio Name:</b> Name your portfolio.</>,
        <><b>Update Instance Details:</b>
          <ul style={{ listStyle: 'none' }}>
            <li><b>- Region:</b> Location of deployment.</li>
            <li><b>- Size:</b> Instance specification.</li>
            <li><b>- UUID/Instance Name:</b> Unique identifier. If omitted, generated automatically.</li>
            <li><b>- Pricing Model:</b> On demand, reserved, or spot.</li>
            <li><b>- Max CPU(%):</b> Peak CPU utilization.</li>
            <li><b>- Max Mem:</b> Peak memory in GB.</li>
            <li><b>- Max Network BW:</b> Peak bandwidth in Mbps.</li>
            <li><b>- Max Disk BW:</b> Peak disk usage in MB/s.</li>
            <li><b>- Max IOPS:</b> Peak I/O operations.</li>
          </ul>
        </>,
        <><b>Add Instance:</b> (<AddCircle fontSize='small' />) Add to portfolio.</>,
        <><b>Save Portfolio:</b> Save instance details.</>,
        <><b>View Portfolios:</b> See saved portfolios.</>,
        <><b>View Instances:</b> Click portfolio to view instances.</>,
        <><b>Delete Instance:</b> (<Delete fontSize='small' />) Remove from list.</>,
        <><b>Cancel:</b> Discard unsaved changes.</>,
        <><b>Delete Portfolio:</b> Remove portfolio.</>,
        <><b>Instance Advice:</b> Get AMD instance recommendations with cost/saving info.</>
      ]} />

      <Typography sx={{ mt: 2 }}>
        <b>Note:</b> Double-click fields to update values. 'Save' and 'Instance Advice' buttons are disabled until errors are fixed.
      </Typography>

      <Section title="Delete Error Records" items={[
        "Click 'Delete Error Records' to remove all errors.",
        "Confirm deletion in popup.",
        "Click 'Delete' to finalize.",
        "Click 'Save' to apply changes and view the updated portfolio."
      ]} />
    </Box>
  );
};

const Section = ({ title, items }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" sx={{ mb: 1, ml: 2 }}>{title}</Typography>
    <Box sx={{ ml: 7 }}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding alignItems="flex-start">
            <ListItemText
              primary={
                <span>
                  <span>{index + 1}.</span>&nbsp;{item}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
);


export default CloudDocumentation;
