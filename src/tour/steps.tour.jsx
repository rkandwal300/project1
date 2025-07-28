import { openSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { store } from "@/redux/store";

export const getEiaSteps = () => [
  {
    id: "step-1",
    text: "Click to open the support menu.",
    attachTo: {
      element: "#step-three-target",
      on: "right",
    },
    offset: "0 20",
    label: "supportMenu",
    isSkip: true,
  },
  {
    id: "step-2",
    label: "releaseNotes",
    text: "Click here to expand previous releases.",
    attachTo: {
      element: "#step-one-target",
      on: "bottom",
      offset: "0 10",
    },
    isStart: true,
    isSkip: true,
  },
  {
    id: "step-3",
    text: "Click this button to view previous releases.",
    speak: `
      Welcome to the AMD EPYC Cloud Instance Advisor, or EIA — a powerful recommendation engine that helps you select the best-fit cloud instances based on your system’s performance data. On the home page, you’ll find a navigation bar with the following options: Click the release notes icon to view what's new. This dialog will appear automatically on your first login and whenever a new version is released. Click the support icon to reach out for help. You can call the hotline or email us directly. Your email is shown on the top-right. Click the profile icon to access account settings and permissions. You can also click the icons to access the user guide , online documentation , about , or to log out . To start gathering metrics, click on the “Download Stat Collector” button. This tool collects CPU, memory, disk, and network stats, and generates an XLSX file used for recommendations. Once downloaded, unzip the file and follow the instructions in the included user guide to execute it.
    `,
    attachTo: {
      element: "#openReleaseNotes",
      on: "top",
      offset: "0 20",
    },
    type: "wait",
    label: "releaseNotes",
  },
  {
    id: "step-4",
    text: "Click here to go home.",
    attachTo: {
      element: "#redirectToHome",
      on: "right",
      offset: "0 20",
    },
    label: "supportMenu",
  },
  {
    id: "step-5",
    text: "Click to open your user profile menu.",
    attachTo: {
      element: "#step-four-target",
      on: "right",
      offset: "0 20",
    },
    label: "profileMenu",
    isSkip: true,
  },
  {
    id: "step-6",
    text: "Manage your user profile settings here.",
    attachTo: {
      element: "#step-four-target",
      on: "right",
    },
    label: "profileMenu",
    isSkip: true,
  },
  {
    id: "step-7",
    text: "Click to open the download menu.",
    attachTo: {
      element: "#step-five-target",
      on: "bottom",
    },
    type: "wait",
    speak: `Click on the “Downloads” button to get the templates. Download the Instance Details Template and fill in data such as UUID, CSP, instance type, region, CPU, memory, disk and network utilization. Optionally, download the Self-Performance Assessment Template, if applicable.`,
    label: "downloadMenu",
    isSkip: true,
  },
  {
    id: "step-8",
    text: "Download the template in Excel (.xlsx) format to ensure your data is formatted correctly. Fill all required fields as per the template structure.",
    attachTo: {
      element: "#downloadSelectTemplate",
      on: "right",
    },
    type: "wait",
    label: "downloadMenu",
    action: {
      next: () => {
        const state = store.getState();
        const { sidebar } = state;
        if (!sidebar.isOpen) {
          store.dispatch(openSidebar());
        }
      },
    },
    isSkip: true,
  },
  {
    id: "step-9",
    text: "Click to open the Service Provider list.",
    attachTo: {
      element: "#step-six-target",
      on: "left",
    },
    type: "wait",
    label: "serviceProviderMenu",
    speak: `Once your file is ready, click on the Upload Instances button. Choose the Cloud Service Provider from the dropdown — AWS, Azure, or GCP. Enter a portfolio name. Click “Upload Instances” to browse and upload your XLSX file containing up to 20,000 records. Once uploaded, the details will appear under the “Instance Stats” section. To upload performance assessment data, check the box to enable the upload field. Click “Upload Self-Perf Assessment”, then browse and select your XLSX file. The details can be viewed under the “Self-Perf Assessment” tab. `,
    isSkip: true,
  },
  {
    id: "step-9.1",
    text: "Select your preferred Service Provider from the list.",
    attachTo: {
      element: "#menuItem-cloud-Azure",
      on: "left",
    },
    type: "wait",

    label: "serviceProviderMenu",
    isSkip: true,
  },
  {
    id: "step-10",
    text: "Enter a name for your portfolio. This will help identify it in the system.",
    attachTo: {
      element: "#portfolio-name",
      on: "bottom",
    },
    speak: `To manually add instances to an existing portfolio: Select the portfolio. Under “Generic Metadata”, select the region, instance type, enter the UUID, and choose the pricing model. Under “Consumption Metadata”, enter performance values for CPU, memory, disk, network, and IOPS. Click the Add Instance button, indicated by the “+” icon. Then click “Save” to add it to the portfolio. To remove unsaved entries, click “Cancel” and confirm in the popup.`,
    type: "wait",
    label: "portfolioName",
  },
  {
    id: "step-11",
    text: "Upload the instance file or updated template here. The data will auto-populate in the table below.",
    attachTo: {
      element: "#uploadInstances",
      on: "bottom",
    },

    label: "uploadInstances",
  },
  {
    id: "step-12",
    text: "Click Save to add this as a portfolio in the EIA application.",
    attachTo: {
      element: "#savePortfolio",
      on: "top",
    },
    label: "savePortfolio",
  },
  {
    id: "step-13",
    text: "Click to permanently delete the selected portfolio.",
    attachTo: {
      element: "#deletePortfolio",
      on: "top",
    },
    type: "wait",
    speak: `To delete a portfolio, select it and click “Delete Portfolio”, then confirm in the popup. To delete selected instances, click “Delete” at the bottom of the table and confirm.`,
    //     speak: `To remove all error records, click “Delete Error Records”.
    // A confirmation popup will appear. Click “Delete” to proceed.
    // Then, click “Save” to apply the changes.`,
    label: "deletePortfolio",
    isSkip: true,
  },
  {
    id: "step-14",
    text: "Click to cancel portfolio deletion.",
    attachTo: {
      element: "#cancelDeletePortfolio",
      on: "bottom",
    },
    type: "wait",
    label: "deletePortfolio",
    isSkip: true,
  },
  {
    id: "step-15",
    text: "View AMD instance recommendations with cost comparisons and potential savings.",
    attachTo: {
      element: "#instanceAdvice",
      on: "top",
    },
    type: "wait",
    label: "instanceAdvice",
  },
  {
    id: "step-16",
    text: "Export cost advice as an Excel (.xlsx) file for offline use.",
    attachTo: {
      element: "#btn-cost-advice-export",
      on: "bottom",
    },
    type: "wait",
    label: "costAdviceExport",
    isSkip: true,
  },
  {
    id: "step-17",
    text: "Click to view the summary of cost advice data.",
    attachTo: {
      element: "#summary-accordion-header",
      on: "bottom",
    },
    type: "wait",
    label: "costAdviceSummary",
    isSkip: true,
  },
  {
    id: "step-17.1",
    text: "Click to collapse the cost advice summary.",
    attachTo: {
      element: "#summary-accordion-header",
      on: "top",
    },
    type: "wait",
    label: "costAdviceSummary",
    isSkip: true,
  },
  {
    id: "step-18",
    text: "Switch to view annual pricing.",
    attachTo: {
      element: "#annuallyPrice",
      on: "top",
    },
    type: "wait",
    label: "pricingSwitch",
    isSkip: true,
  },
  {
    id: "step-19",
    text: "Switch to view monthly pricing.",
    attachTo: {
      element: "#annuallyPrice",
      on: "top",
    },
    type: "wait",
    label: "pricingSwitch",
    isSkip: true,
  },
  {
    id: "step-20",
    text: "Scroll through the cost advisory table.",
    attachTo: {
      element: "#instance-advice-table",
      on: "bottom",
    },
    type: "wait",
    label: "costAdvisoryTable",
    isSkip: true,
  },

  {
    id: "step-23",
    text: "Click to close the cost advisory view.",
    attachTo: {
      element: "#close-instance-advice",
      on: "bottom",
    },
    type: "wait",
    label: "closeCostAdvice",
  },
  {
    id: "step-24",
    text: "Click to create a new portfolio.",
    attachTo: {
      element: "#btn-dashboard-createPortfolio",
      on: "bottom",
    },
    speak: `Click the “+” icon in the portfolios section to start a new portfolio and reset the instance table.`,
    type: "wait",
    label: "createPortfolio",
    isSkip: true,
  },
  {
    id: "step-25",
    text: "Enter a name for your new portfolio.",
    attachTo: {
      element: "#portfolio-name",
      on: "bottom",
    },
    type: "wait",
    label: "createPortfolio",
  },
  {
    id: "step-25.1",
    text: "Manually input instance details. Complete all required fields marked with an asterisk (*).",
    attachTo: {
      element: "#generic-metadata-form",
      on: "bottom",
    },
    type: "wait",
    label: "createPortfolio",
  },
  {
    id: "step-25.2",
    text: "Continue entering instance details. Required fields must be filled before saving.",
    attachTo: {
      element: "#consumption-metadata-form",
      on: "bottom",
    },
    type: "wait",
    label: "createPortfolio",
  },
  {
    id: "step-26",
    text: "Click to add a new VM entry using the provided inputs. Ensure all fields are complete.",
    attachTo: {
      element: "#addInstanceFormTarget",
      on: "bottom",
    },
    type: "wait",
    label: "createPortfolio",
  },
  {
    id: "step-27",
    text: " Click to replace the selected VM entry with the new input values. First, select a row, update the fields, and then click Replace.",
    attachTo: {
      element: "#findAndReplace",
      on: "bottom",
    },
    speak: `To quickly update instance types, regions, or pricing models, click “Find & Replace”. Select values from the “From” and “To” dropdowns. Click “Replace All” to apply changes across the dataset. Click “Save” to finalize.`,
    type: "wait",
    label: "replaceInstanceFields",
    isSkip: true,
  },
  {
    id: "step-28",
    text: "Select the current instance type you want to change.",
    attachTo: {
      element: "#instanceTypeTargetFrom",
      on: "bottom",
    },
    type: "wait",
    label: "replaceInstanceFields",
    isSkip: true,
  },
  {
    id: "step-29",
    text: "Select the new instance type to apply.",
    attachTo: {
      element: "#instanceTypeTargetTo",
      on: "bottom",
    },
    type: "wait",
    label: "replaceInstanceFields",
    isSkip: true,
  },
  {
    id: "step-30",
    text: "Click to save the changes.",
    attachTo: {
      element: "#ReplaceAllButton",
      on: "bottom",
    },
    type: "wait",
    label: "replaceInstanceFields",
    isSkip: true,
  },
  {
    id: "step-31",
    text: "Click to make this field editable.",
    attachTo: {
      element: "#tableCell0_maxCpuUtilization",
      on: "top",
    },
    type: "wait",
    speak: `If any upload errors occur, they’ll be flagged with specific messages. To fix them, double-click the field and make the necessary updates. Click anywhere on the table to apply the changes. Click “Save” to confirm all updates.`,
    label: "editInstanceField",
    isSkip: true,
  },
  {
    id: "step-32",
    text: "Click to update the edited value.",
    attachTo: {
      element: "#tableCell_0_maxCpuUtilization_cell",
      on: "top",
    },
    type: "wait",
    label: "editInstanceField",
    isSkip: true,
  },
  {
    id: "step-33",
    text: "Click Save to add the instance as a portfolio in the EIA application.",
    attachTo: {
      element: "#savePortfolio",
      on: "top",
    },
    label: "savePortfolio",
    type: "wait",
  },
  {
    id: "step-34",
    text: "View AMD instance recommendations with cost comparison and potential savings.",
    attachTo: {
      element: "#instanceAdvice",
      on: "top",
    },
    type: "wait",
    label: "instanceAdvice",
  },
  {
    id: "step-35",
    text: "Click to close the cost advisory panel.",
    attachTo: {
      element: "#close-instance-advice",
      on: "bottom",
    },
    type: "wait",
    label: "closeCostAdvice",
  },
  {
    id: "step-36",
    text: "Click to view Stat Collector information.",
    attachTo: {
      element: "#btn-stat-collector",
      on: "bottom",
    },
    type: "wait",
    label: "statCollectorInfo",
    isSkip: true,
  },
  {
    id: "step-37",
    text: "Download the Stat Collector file.",
    attachTo: {
      element: "#btn-download-stat-collector",
      on: "bottom",
    },

    type: "wait",
    label: "statCollectorInfo",
    isSkip: true,
  },
  {
    id: "step-38",
    text: "Click to open your user profile menu.",
    attachTo: {
      element: "#step-four-target",
      on: "right",
      offset: "0 20",
    },
    speak: `That wraps up your guided tour of the AMD EPYC Cloud Instance Advisor. For further help, refer to the user guide or click the support icon. Start optimizing your cloud workloads today.`,
    label: "profileMenu",
  },
  {
    id: "step-39",
    text: "Click here to log out of the application.",
    attachTo: {
      element: "#logout-link",
      on: "right",
      offset: "0 20",
    },
    type: "wait",
    label: "logout",
    isEnd: true,
  },
];

export const getCcaSteps = () => [ {
    id: "step-1",
    text: "Click to open the support menu.",
    attachTo: {
      element: "#step-three-target",
      on: "right",
    },
    offset: "0 20",
    label: "supportMenu",
    isSkip: true,
  },
  {
    id: "step-2",
    label: "releaseNotes",
    text: "Click here to expand previous releases.",
    attachTo: {
      element: "#step-one-target",
      on: "bottom",
      offset: "0 10",
    },
    isStart: true,
    isSkip: true,
  },
  {
    id: "step-3",
    text: "Click this button to view previous releases.",
    speak: `
      Welcome to the AMD EPYC Cloud Instance Advisor, or EIA — a powerful recommendation engine that helps you select the best-fit cloud instances based on your system’s performance data. On the home page, you’ll find a navigation bar with the following options: Click the release notes icon to view what's new. This dialog will appear automatically on your first login and whenever a new version is released. Click the support icon to reach out for help. You can call the hotline or email us directly. Your email is shown on the top-right. Click the profile icon to access account settings and permissions. You can also click the icons to access the user guide , online documentation , about , or to log out . To start gathering metrics, click on the “Download Stat Collector” button. This tool collects CPU, memory, disk, and network stats, and generates an XLSX file used for recommendations. Once downloaded, unzip the file and follow the instructions in the included user guide to execute it.
    `,
    attachTo: {
      element: "#openReleaseNotes",
      on: "top",
      offset: "0 20",
    },
    type: "wait",
    label: "releaseNotes",
  },
  {
    id: "step-4",
    text: "Click here to go home.",
    attachTo: {
      element: "#redirectToHome",
      on: "right",
      offset: "0 20",
    },
    label: "supportMenu",
  },];
