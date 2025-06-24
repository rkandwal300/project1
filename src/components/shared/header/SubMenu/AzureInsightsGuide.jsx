import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const AzureInsightsGuide = () => {
  return (
    <Box p={1}>
    

      <Typography variant="body1" mt={2}>
        With the Telemetry Connector option, you can link your Azure App Insights account by providing your{" "}
        <b>Client ID</b>, <b>Client Secret</b>, <b>Tenant ID</b>, <b>Subscription ID</b>. The platform will authenticate your Azure account and retrieve the instances that are already being monitored through Azure App Insights' telemetry data.
      </Typography>

      <Typography variant="body1" mt={3} fontWeight={500}>
        To add instance via Azure App Insights:
      </Typography>

      <Box component="ol" sx={{ pl: 3 }} type="1">
        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            From the service provider dropdown, select <b>Azure App Insights</b>.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>Provide a name for your portfolio.</Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Select the <b>Region</b>. By default, all applicable regions will be selected, but you can edit this to choose only the specific regions needed.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>Enter the below details:</Typography>
          <Box component="ol" type="a" sx={{ pl: 4, mt: 1 }}>
            <Box component="li" sx={{ display: "list-item", mt: 1 }}>
              <Typography>
                <b>Client ID</b>
              </Typography>
            </Box>
            <Box component="li" sx={{ display: "list-item", mt: 1 }}>
              <Typography>
                <b>Client Secret</b>
              </Typography>
            </Box>
            <Box component="li" sx={{ display: "list-item", mt: 1 }}>
              <Typography>
                <b>Tenant ID</b>
              </Typography>
            </Box>
            <Box component="li" sx={{ display: "list-item", mt: 1 }}>
              <Typography>
                <b>Subscription ID</b>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Click <b>Test Connection</b> to verify the connection
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Once the connection is successful, a confirmation message <b>“Azure Insights connection is successful”</b> will appear
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            Click on <b>Fetch/Sync Instances</b> to retrieve all the instances that are linked to your CloudWatch telemetry account.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            The system will retrieve all instances linked to your Azure App Insights telemetry account. You can then choose the instances that are required for cost advice.
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
            <b>Delete Portfolio</b>: If you need to remove a portfolio, click on <b>"Delete Portfolio"</b>.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            <b>Update Credentials</b>: To update the portfolio credentials, click on <b>"Update Credentials"</b>.
          </Typography>
        </Box>

        <Box component="li" sx={{ display: "list-item", mt: 1 }}>
          <Typography>
            <b>Instance Advice</b>: Click on <b>“Instance Advice”</b> to view recommendations.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AzureInsightsGuide;
