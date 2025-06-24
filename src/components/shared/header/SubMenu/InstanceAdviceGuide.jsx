import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const InstanceAdviceGuide = () => {
  return (
    <Box p={1}>
      <Typography sx={{ mt: 2 }}>
        The AMD EPYC Cloud Instance Advisor (EIA) platform analyzes the instance
        details and provides optimal instance recommendations and insights
        through a set of graphical representations and a table. These graphs
        help visualize key metrics, allowing you to compare your current cloud
        instance with optimized recommendations.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, ml: 3 }}>
          Accessing and Using Instance Advice
        </Typography>
        <Box sx={{ ml: 4 }}>
          <List component="ol" sx={{ listStyleType: "decimal", pl: 3 }} dense>
            {[
              "Save Your Portfolio: Ensure that your portfolio, including all instance details, is saved before accessing the Instance Advice feature.",
              "Navigate to Portfolio Section: Go to the Portfolio section of the application.",
              "Select Portfolio Account: Click on the desired portfolio account from which you want to get Instance advice.",
              'Access Instance Advice: Click on "Instance Advice” to view recommendations.',
            ].map((text, index) => (
              <ListItem
                key={index}
                component="li"
                sx={{ display: "list-item" }}
                disablePadding
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem
              component="li"
              sx={{ display: "list-item" }}
              disablePadding
            >
              <ListItemText
                primary={
                  <>
                    Once you access the Instance Advice feature, a table will
                    appear along with graphs displaying the following:
                    <List>
                      <ListItem disablePadding>
                        <ListItemText primary="• Current Instances: Details of your existing instances." />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText primary="• Recommended Instances: Suggestions for AMD instances categorized for optimization." />
                      </ListItem>
                    </List>
                  </>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Box>

      <Box sx={{ mt: 3, ml: 3 }}>
        <Typography>The following charts are displayed:</Typography>
        <Box sx={{ ml: 1 }}>
          <List component="ol" sx={{ listStyleType: "decimal", pl: 3 }}>
            <ListItem
              component="li"
              sx={{ display: "list-item" }}
              disablePadding
            >
              <ListItemText primary="Cost ($) Graph: Compares the monthly cost of your current instance with three recommendations (Optimal, Good, Best)." />
            </ListItem>
            <ListItem
              component="li"
              sx={{ display: "list-item" }}
              disablePadding
            >
              <ListItemText primary="Power (kW) Graph: Shows power usage differences between current and recommended instances." />
            </ListItem>
            <ListItem
              component="li"
              sx={{ display: "list-item" }}
              disablePadding
            >
              <ListItemText primary="Carbon (kgCO2eq) Graph: Presents the carbon footprint of your current and recommended instances." />
            </ListItem>
            <ListItem
              component="li"
              sx={{ display: "list-item" }}
              disablePadding
            >
              <ListItemText primary="Summary: A side-by-side comparison of Cost, Power, and Carbon for CI vs R1 (Optimal)." />
            </ListItem>
          </List>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, ml: 3 }}>
          Recommendation Categories
        </Typography>
        <Box sx={{ ml: 4 }}>
          <Typography>
            1. Once you access the Instance Advice feature, a table will appear
            displaying the following:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                sx={{ fontWeight: 600 }}
                primary="- Instance Identifier"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                sx={{ fontWeight: 600 }}
                primary="- Current Instance Details"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                sx={{ fontWeight: 600 }}
                primary="- Recommendation Instance Details optimized"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <>
                    - Current and Recommended instances include:
                    <List sx={{ pl: 2,listStyleType: "disc", }} component={"ul"}>
                      <ListItem
                        component="li"
                        sx={{ display: "list-item" }}
                        disablePadding
                      >
                        <ListItemText primary="Cloud Service Provider: The cloud platform hosting the instance." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="Instance Type: The model/type of instance." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="vCPU(s): Number of virtual CPUs assigned." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="Cost($): Monthly cost, calculated as hourly price × 730." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="Power(kW): Power usage based on CPU load, from Boavizta API." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="Carbon(kgCO2eq): Carbon emissions, calculated via Boavizta API." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="Remark: Reason for skipped instances." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="Savings(%): Displays cost savings." />
                      </ListItem>
                      <ListItem
                        disablePadding
                        component="li"
                        sx={{ display: "list-item" }}
                      >
                        <ListItemText primary="Performance Improvement*: Factor of performance gain in recommended instance." />
                      </ListItem>
                    </List>
                  </>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Box>

      <Box sx={{ mt: 3, ml: 2 }}>
        <Typography fontWeight="bold">Note:</Typography>
        <List sx={{ ml: 5 }}>
          <ListItem disablePadding>
            <ListItemText primary="Skipped Instances: Marked with '-' if invalid or unsupported." />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Remarks column shows reason for skipping." />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ mt: 2, ml: 3 }}>
        <Typography variant="h6">Export:</Typography>
        <Typography sx={{ mt: 1, ml: 2 }}>
          To download the instance advice report, click{" "}
          <strong>“Export”</strong>. An Excel file will be downloaded.
        </Typography>
        <Typography sx={{ mt: 2, ml: 2 }}>
          <strong>Close:</strong> Click <strong>“Close”</strong> to return to
          the previous screen.
        </Typography>
      </Box>
    </Box>
  );
};

export default InstanceAdviceGuide;
