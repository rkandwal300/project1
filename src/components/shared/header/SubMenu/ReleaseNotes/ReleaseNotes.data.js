export const releaseNotesTableData = [
  {
    version: "v3.0.0",
    releaseDate: "May, 2025",
    majorFeatures: [
      {
        label: "Google Cloud Platform (GCP)",
        values: [
          "GCP support extended to all the regions across globe.(regional availability should be considered)",
        ],
      },
      {
        label: "Microsoft Azure",
        values: ["Azure is now supported across all countries and regions."],
      },
      {
        label: "Spot Instance Pricing",
        values: [
          "Users can now link their AWS CloudWatch account to view all instances and receive recommendations and cost advice.",
        ],
      },
    ],

    minorImprovements: [
      {
        label: "Excel export",
        values: [
          "Enhancement of font size and modification of note colors in the exported file for improved visibility.",

          "The Current instance details such as Instance Type, Cost, Power, and Carbon emission has been frozen for more accurate comparison in the Excel document.",
        ],
      },
      {
        label: "Bug fixes and performance improvements",
        values: [],
      },
    ],
    upComing: [
      {
        label: "Azure app insights support:",
        values: [
          "Extended telemetry tool with Azure Application Insights to further enhance data collection and analysis.",
        ],
      },
      {
        label:
          "Hyper-V VM’s support for recommendations/cost advice Automated CUR ingests",
        values: [
          "Customers can upload a data file, and the EPYC advisory service will extract the necessary data and create an input file for the cost advisor and instance advisor.",
        ],
      },
      {
        label:
          "Custom headroom recommendations Improvised interactive demo Refined EIA recommendations",
        values: [
          "Clear differentiation between the recommendations for EIA",
          "Cost optimized",
          "Performance optimized",
          "Less power and less carbon producing instances",
        ],
      },
    ],
  },
  {
    version: "v2.0.0",
    releaseDate: "Apr, 2025",
    majorFeatures: [
      {
        label: "Google Cloud Platform (GCP)",
        values: [
          "GCP support extended to include the US, UK, Netherlands, India and Australia.",
        ],
      },
      {
        label: "Microsoft Azure",
        values: ["Azure is now supported across all countries and regions."],
      },
      {
        label: "Spot Instance Pricing",
        values: [
          "Support added for ‘Spot Instance’ pricing model enabling more cost-effective recommendations.",
        ],
      },
    ],

    minorImprovements: [
      {
        label: "Instance Advice Table",
        values: [
          "Current instance columns are now frozen in the instance advice table for easier comparison with optimal, best and good options.",
        ],
      },
      {
        label: "Telemetry Integration for GCP and Azure",
        values: [
          "GCP Datadog telemetry is included. It allows customers to link their Datadog account with GCP VMs, eliminating the need to export and upload data for cost recommendations.",
        ],
      },
      {
        label: "Spot Instance Pricing",
        values: [
          "Support added for ‘Spot Instance’ pricing model enabling more cost-effective recommendations.",
          "Azure Datadog telemetry is included. It allows customers to link their Datadog account with Azure VMs, eliminating the need to export and upload data for cost recommendations.",
        ],
      },
      {
        label: "User Management",
        values: [
          "Users can request a role change directly within the platform. Admins have the ability to approve or deny these requests.Access to specific features and operations will adjust automatically based on the user’s assigned role",
          "Additionally, organization admins can view all portfolios uploaded by their team members for improved oversight and management.",
        ],
      },
      {
        label: "Smart Recommendations",
        values: [
          "No cost recommendations are shown if the current instance is already using the latest AMD processor",
        ],
      },
      {
        label: "Interactive Demos",
        values: [
          "Customers are provided with interactive demos during registration and login, as well as for CCA and EIA applications, to enhance their onboarding experience",
        ],
      },
    ],
    upComing: [
      {
        label: "Telemetry Enhancements",
        values: [
          "Extended telemetry tool with AWS CloudWatch and Azure Application Insights to further enhance data collection and analysis.",
        ],
      },
      {
        label: "Expanded GCP Support",
        values: [
          "Full global coverage for all countries and regions on Google platform.",
        ],
      },
      {
        label: "Meta Collector Tool",
        values: [
          "A new tool for centralized data aggregation and enhanced performance insight.",
        ],
      },
    ],
  },
  {
    version: "v1.7.0",
    releaseDate: "Mar, 2025",

    majorFeatures: [
      {
        label: "GCP Support",
        values: [
          "Users can now add their GCP accounts to retrieve VM details and receive instance advice/recommendations.",
          "Currently, GCP support is available only for US regions.",
        ],
      },
    ],

    minorImprovements: [
      {
        label: "Azure Pricing Model",
        values: [
          "Added support for the “reserved” pricing model in Azure Cloud.",
        ],
      },
      {
        label: "Bug Fixes and Performance Improvements",
        values: [
          "GCP Datadog telemetry is included. It allows customers to link their Datadog account with GCP VMs, eliminating the need to export and upload data for cost recommendations.",
        ],
      },
      {
        label: "Spot Instance Pricing",
        values: [
          "Various bug fixes and optimizations for improved performance.",
        ],
      },
    ],
    upComing: [
      {
        label: "Expanded GCP Region Support",
        values: [
          "GCP recommendation support will extend to four additional countries: UK, Netherlands, India and Germany.",
        ],
      },
      {
        label: "Global Azure Support",
        values: [
          "Azure cloud recommendations will be available for all countries.",
        ],
      },
    ],
  },
  {
    version: "v1.6.0",
    releaseDate: "Feb, 2025",

    majorFeatures: [
      {
        label: "AWS Telemetry Connector",
        values: [
          "Customers are enabled with DataDog telemetry connector to fetch metrics, supporting advisory services. This effort serves as a backup for the need to use the StatsCollector tool offered by advisory services.",
          "This enhancement allows for seamless collection of metrics from Datadog, enabling users to receive tailored cost advice for selected instances.",
        ],
      },
    ],

    minorImprovements: [
      {
        label: "Delete Error Button",
        values: [
          "If users encounter multiple errors after uploading a file, a new Delete Error button has been added. Clicking this button will remove all instance rows with errors at once.",
          "This option simplifies the process by eliminating the need to delete each error row individually, making it easier to manage and correct the data.",
        ],
      },
      {
        label: "Bug Fixes",
        values: [
          "The “All” option has been removed to view the List of Instances and Cost Advice tables to improve the performance.",
          "Several minor bug fixes have been implemented to improve the overall application experience and compliance.",
        ],
      },
    ],
    upComing: [
      {
        label: "Azure Regional Beta",
        values: [
          "Azure recommendation will be available in the US, UK, Denmark, India and Germany regions by the second week of March.",
        ],
      },
    ],
  },
  {
    version: "v1.5.0",
    releaseDate: "Jan, 2025",
    majorFeatures: [
      {
        label: "",
        values: [
          "Users can select their preferred Cloud Service Provider (CSP) between AWS and AZURE and create portfolios within these CSPs.",
          "Simplified switching between saved portfolios for users.",
          "Users can now upload files in addition to manually adding instances with custom metrics.",
          "Users have the option to upload their own metrics or self-performance assessment data to receive tailored advice based on the provided information.",
          "v4 instances from Azure are supported",
        ],
      },
    ],

    minorImprovements: [
      {
        label: "",
        values: [
          "User can now export summary graphs as PNG files.",
          "User guide PDF now opens in a new tab instead of downloading directly.",
          "Added help sections for recommendation.",
          "Recommendations have been updated from R1,R2,R3 to Optimal, Best and Good.",
        ],
      },
    ],

    upComing: [
      {
        label: "",
        values: ["AWS telemetry connector support"],
      },
    ],
  },
  {
    version: "v1.4.0",
    releaseDate: "Dec, 2024",

    majorFeatures: [
      {
        label: "Customer Support/Feedback:",
        values: [
          "A support button has been added with contact details (hotline number and email) for easy access to customer support.",
        ],
      },
      {
        label: "Instance Data Editing:",
        values: [
          "After uploading data, users can now double-click fields to edit the instance data before saving and receiving cost advice.",
        ],
      },
    ],

    minorImprovements: [
      {
        label: "Updated User Guide:",
        values: [
          "The user guide has been updated with the latest information.",
        ],
      },
      {
        label: "Updated Online Help:",
        values: ["Enhanced online help content to support user needs."],
      },
      {
        label: "Performance Enhancements and Bug Fixes:",
        values: [
          "Various performance improvements and bug fixes to ensure smoother functionality.",
        ],
      },
      {
        label: "Region and Instance List:",
        values: [
          "Users can now view a comprehensive list of all regions and instances supported by Summit.",
        ],
        links: [
          {
            label: "List of AWS Regions",
            value: "https://eia-prod.amd.com/regionLists?providerName=AWS",
          },
          {
            label: "List of Azure Regions",
            value: "https://eia-prod.amd.com/regionLists?providerName=AZURE",
          },
        ],
      },
    ],
    upComing: [
      {
        label: "",
        values: ["Azure Support"],
      },
    ],
  },
];
