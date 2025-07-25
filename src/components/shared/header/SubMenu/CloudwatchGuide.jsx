import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const CloudwatchGuide = () => {
   return (
    <Box p={1} overflow="auto" maxHeight="70vh">
      <Typography mt={1}>
        Welcome to the <strong>Manage Portfolio</strong> section of the CCA application. This guide will help you efficiently manage your cloud accounts by adding and updating instance details.
      </Typography>

      <Typography mt={1}>
        <strong>Note:</strong> All your actions and available features will be based on your assigned role.
      </Typography>

      <Typography mt={2}>
        The home page featuring tiles for different functionalities:
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3 }} dense component="ol">
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Manage Portfolio:</strong> Manage and organize your cloud accounts and instances.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Explorer:</strong> Navigate and explore cost insights across your cloud data.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Download User Guide:</strong> Click the (📘) icon to download the CCA user guide.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Help section:</strong> Represented by the (?) icon, offers on-screen instructions and information about the current page.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Profile:</strong> Represented by the (👤) icon, displays the email ID of the logged-in user. To log out, click the icon and select the 'Logout' option.</>} />
        </ListItem>
      </List>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Adding Instances Individually
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3 }} component="ol">
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Select Cloud Service Provider:</strong> Choose the cloud service provider from the options (AWS, AZURE, GCP).</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Enter Portfolio Name:</strong> Provide a name for your portfolio to identify it easily.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<strong>Update Instance Details:</strong>} />
          <ul style={{ paddingLeft: "1.5rem", marginTop: 4 }}>
            <li><strong>UUID/Instance Name:</strong> A unique identifier or name assigned to an instance. For Ex: VM for AI/ML server. If not entered, autogenerated UUID will be added.</li>
            <li><strong>Region:</strong> Specify the geographical location where your cloud instances are deployed.</li>
            <li><strong>Size:</strong> Indicate the specifications or capacity of the cloud instance.</li>
            <li><strong>Quantity:</strong> Enter the number of instances for this configuration.</li>
            <li>
              <strong>Total Number of Hours per Month:</strong>
              <ul style={{ paddingLeft: "1.5rem", marginTop: 4 }}>
                <li>The total number of hours that all the instances (defined by the quantity) will be running during the month.</li>
                <li>To calculate the total hours, multiply the Quantity of instances by 730.</li>
                <li><strong>Note:</strong> 730 is the total number of hours in a month.</li>
                <li>For example, 5 instances * 730 hours = 3650 hours/month.</li>
              </ul>
            </li>
            <li><strong>Pricing Model:</strong> Select the pricing option for the instances (e.g., on demand, reserved or spot).</li>
          </ul>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Add Instance:</strong> Click '+ Add Instance' to add the instance details to your portfolio.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Save Portfolio:</strong> Click 'Save' to store your portfolio with the added instance details.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>View Portfolios:</strong> After saving, you can view your portfolio in the portfolios list on the left side of the page.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>View Instances:</strong> Click on any portfolio account from the list to view the instances saved under that portfolio.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Delete Instance:</strong> Click on the delete icon next to the applicable instance row and confirm the deletion.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Cancel:</strong> Click 'Cancel' to discard the unsaved instances from the list.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Delete Portfolio:</strong> If needed, click on 'Delete Portfolio'.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Cost Advice:</strong> Click 'Cost Advice' to receive recommendations on AMD instances compared to your current instances.</>} />
        </ListItem>
      </List>

      <Typography variant="h6" fontWeight="bold" gutterBottom mt={4}>
        Uploading Instances in Bulk
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3 }} dense component="ol">
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Download Template:</strong> Click on Template button to download the Excel template required for bulk uploading.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Fill in Template:</strong> Complete the template with instance details including uuid, cloud, region, size, quantity, Total Number of Hours per Month and Pricing Model.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Upload:</strong> Click 'Upload' and browse for the completed template file to upload it.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>View Uploaded Instances:</strong> After uploading, the instance details will be reflected in the table on the page.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Enter Portfolio Name:</strong> Provide a name for your new portfolio.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Save Portfolio:</strong> Click 'Save' to store the portfolio with the uploaded instance details.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>View Portfolios:</strong> After saving, you can see your portfolio in the portfolios list on the left side of the page.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>View Instances:</strong> Click on any portfolio account from the list to view the instances saved under that portfolio.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Delete Instance:</strong> Click on the delete icon next to the applicable instance row and confirm the deletion.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Cancel:</strong> Click 'Cancel' to discard the unsaved instances from the list.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Delete Portfolio:</strong> To delete a portfolio, click 'Delete Portfolio'.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<><strong>Cost Advice:</strong> Click 'Cost Advice' to receive AMD recommendations and estimated savings.</>} />
        </ListItem>
      </List>

      <Typography variant="h6" fontWeight="bold" gutterBottom mt={4}>
        Find & Replace
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3 }} dense component="ol">
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="Click the (🔍) button to fix errors using the Find & Replace option." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="From the Instance Type tab, select the invalid instance type you want to change under the 'From' dropdown, and select the correct type under the 'To' dropdown." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="From the Region tab, select the invalid region you want to change under the 'From' dropdown, and select the correct region under the 'To' dropdown." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="From the Pricing Model tab, select the invalid pricing model you want to change under the 'From' dropdown, and select the correct pricing model under the 'To' dropdown." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="Click 'Replace All' to apply the selected replacements. This will update all matching invalid values with the selected correct ones." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="Repeat the process for all invalid instance types, regions, and pricing models." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="Once all errors are resolved, the 'From' dropdown will show all values currently in the table, and the 'To' dropdown will show all valid values based on the selected cloud provider." />
        </ListItem>
      </List>

      <Typography mt={2}>
        <strong>Note:</strong> Double-click each field to manually update values and correct errors. The 'Save' and 'Cost Advice' buttons will remain disabled until all errors are resolved.
      </Typography>

      <Typography variant="h6" fontWeight="bold" gutterBottom mt={4}>
        Delete Error Records:
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3 }} dense>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<>To delete all the error records at once, click on the <strong>"Delete Error Records"</strong> button.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="A confirmation popup will appear asking you to confirm the deletion." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<>To confirm, click the <strong>"Delete"</strong> button in the popup. This will remove all the error records from your list.</>} />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary={<>Click <strong>“Save”</strong> to apply changes. After saving, you can view the added portfolio in the portfolios list on the left side of the page.</>} />
        </ListItem>
      </List>
    </Box>
  );
};

export default CloudwatchGuide;
