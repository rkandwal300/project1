import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const DatadogGuide = () => {
  return (
    <Box   p={1}>
    

      <Typography variant="body1" mt={2}>
        With the Telemetry Connector option, you can link your Datadog account by providing your{" "}
        <b>API Key</b>, <b>Application Key</b> and <b>Host</b>. The platform will authenticate your Datadog account and
        retrieve the instances that are already being monitored through Datadog’s telemetry data.
      </Typography>

      <Typography variant="body1" mt={3} fontWeight={500}>
        To add instance via Datadog:
      </Typography>

      <Box component="ol" sx={{ pl: 3 }} type="1">
        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            From the service provider dropdown, select <b>Datadog</b>.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Select <b>Cloud</b> (AWS, AZURE, GCP).
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>Provide a name for your portfolio.</Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Select the <b>Region</b>. By default, all applicable regions will be selected, but you can edit this to choose
            only the specific regions needed.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>Enter the below details:</Typography>
          <Box component="ol" type="a" sx={{ pl: 4, mt: 1 }}>
            <Box component="li" sx={{ display: "list-item", mt: 1 }}>
              <Typography>
                <b>API Key</b>: your Datadog <b>API Key</b> to authenticate the connection.
              </Typography>
            </Box>
            <Box component="li" sx={{ display: "list-item", mt: 1 }}>
              <Typography>
                <b>Application Key</b>: Provide your Datadog <b>Application Key</b> for secure access to your telemetry data.
              </Typography>
            </Box>
            <Box component="li" sx={{ display: "list-item", mt: 1 }}>
              <Typography>
                <b>Host</b>: Input the <b>Host</b> associated with your Datadog account.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Click <b>Test Connection</b> to verify the connection.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Once the connection is successful, a confirmation message <b>"Datadog connection is successful"</b> will appear.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Click on <b>Fetch/Sync Instances</b> to retrieve all the instances that are linked to your Datadog telemetry account.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            The system will retrieve all instances linked to your Datadog telemetry account. You can then choose the instances
            that are required for cost advice.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Click <b>Save Metrics</b> to save the portfolio with the selected instances for cost analysis.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            After saving, you can view the added portfolio in the portfolios list on the left side of the page.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            <b>Delete Portfolio</b>: If you need to remove a portfolio, click on "<b>Delete Portfolio</b>".
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            <b>Update Credentials</b>: To update the portfolio credentials, click on "<b>Update Credentials</b>".
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            <b>Instance Advice</b>: Click on <b>"Instance Advice"</b> to view recommendations.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DatadogGuide;
