import { openSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { store } from "@/redux/store";

const steps = () => [
  {
    id: "step-1",
    text: "Click this button to view previous releases.",
    attachTo: {
      element: "#step-one-target",
      on: "bottom",
      offset: "0 10",
    },
  },
  {
    id: "step-2",
    text: "Click here to close the dialog box.",
    attachTo: {
      element: "#step-two-target",
      on: "top",
      offset: "0 20",
    },
    type: "wait",
  },
  {
    id: "step-3",
    text: "Click to open the support menu.",
    attachTo: {
      element: "#step-three-target",
      on: "right",
    },
    offset: "0 20",
  },
  {
    id: "step-4",
    text: "Access all support options here.",
    attachTo: {
      element: "#step-three-target",
      on: "right",
      offset: "0 20",
    },
  },
  {
    id: "step-5",
    text: "Click to open your user profile menu.",
    attachTo: {
      element: "#step-four-target",
      on: "right",
      offset: "0 20",
    },
  },
  {
    id: "step-6",
    text: "Manage your user profile settings here.",
    attachTo: {
      element: "#step-four-target",
      on: "right",
    },
  },
  {
    id: "step-7",
    text: "Click to open the download menu.",
    attachTo: {
      element: "#step-five-target",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-8",
    text: "Download the template in Excel (.xlsx) format to ensure your data is formatted correctly. Fill all required fields as per the template structure.",
    attachTo: {
      element: "#downloadSelectTemplate",
      on: "right",
    },
    type: "wait",
    action: {
      next: () => {
        const state = store.getState();
        const { sidebar } = state;
        if (!sidebar.isOpen) {
          store.dispatch(openSidebar());
        }
      },
    },
  },
  {
    id: "step-9",
    text: "Click to open the Service Provider list.",
    attachTo: {
      element: "#step-six-target",
      on: "left",
    },
    type: "wait",
  },
  {
    id: "step-9.1",
    text: "Select your preferred Service Provider from the list.",
    attachTo: {
      element: "#MenuItem-azure",
      on: "left",
    },
    type: "wait",
  },
  {
    id: "step-10",
    text: "Enter a name for your portfolio. This will help identify it in the system.",
    attachTo: {
      element: "#portfolio-name",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-11",
    text: "Upload the instance file or updated template here. The Maximum limit is 20,000 records. Once uploaded, the data will auto-populate in the table below.",
    attachTo: {
      element: "#uploadInstances",
      on: "bottom",
    },
  },
  {
    id: "step-12",
    text: "Click Save to add this as a portfolio in the EIA application.",
    attachTo: {
      element: "#savePortfolio",
      on: "top",
    },
  },
  {
    id: "step-13",
    text: "Click to permanently delete the selected portfolio.",
    attachTo: {
      element: "#deletePortfolio",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-14",
    text: "Click to cancel portfolio deletion.",
    attachTo: {
      element: "#cancelDeletePortfolio",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-15",
    text: "View AMD instance recommendations with cost comparisons and potential savings.",
    attachTo: {
      element: "#instanceAdvice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-16",
    text: "Export cost advice as an Excel (.xlsx) file for offline use.",
    attachTo: {
      element: "#btn-cost-advice-export",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-17",
    text: "Click to view the summary of cost advice data.",
    attachTo: {
      element: "#summary-accordion-header",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-17.1",
    text: "Click to collapse the cost advice summary.",
    attachTo: {
      element: "#summary-accordion-header",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-18",
    text: "Switch to view annual pricing.",
    attachTo: {
      element: "#annuallyPrice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-19",
    text: "Switch to view monthly pricing.",
    attachTo: {
      element: "#annuallyPrice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-20",
    text: "Scroll through the cost advisory table.",
    attachTo: {
      element: "#instance-advice-table",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-21",
    text: "Continue scrolling the cost advisory table.",
    attachTo: {
      element: "#instance-advice-table",
      on: "bottom",
    },
    type: "wait",
    popperOptions: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [100, 10],
          },
        },
      ],
    },
  },
  {
    id: "step-22",
    text: "Keep scrolling for more cost advisory data.",
    attachTo: {
      element: "#instance-advice-table",
      on: "bottom",
    },
    popperOptions: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [100, 10], // [x-offset, y-offset] → moves right and down
          },
        },
      ],
    },
    type: "wait",
  },
  {
    id: "step-23",
    text: "Click to close the cost advisory view.",
    attachTo: {
      element: "#close-instance-advice",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-24",
    text: "Click to create a new portfolio.",
    attachTo: {
      element: "#btn-dashboard-createPortfolio",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-25",
    text: "Enter a name for your new portfolio.",
    attachTo: {
      element: "#portfolio-name",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-25.1",
    text: "Manually input instance details. Complete all required fields marked with an asterisk (*).",
    attachTo: {
      element: "#generic-metadata-form",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-25.2",
    text: "Continue entering instance details. Required fields must be filled before saving.",
    attachTo: {
      element: "#consumption-metadata-form",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-26",
    text: "Click to add a new VM entry using the provided inputs. Ensure all fields are complete.",
    attachTo: {
      element: "#addInstanceFormTarget",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-27",
    text: " Click to replace the selected VM entry with the new input values. First, select a row, update the fields, and then click Replace.",
    attachTo: {
      element: "#findAndReplace",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-28",
    text: "Select the current instance type you want to change.",
    attachTo: {
      element: "#instanceTypeTargetFrom",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-29",
    text: "Select the new instance type to apply.",
    attachTo: {
      element: "#instanceTypeTargetTo",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-30",
    text: "Click to save the changes.",
    attachTo: {
      element: "#ReplaceAllButton",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-31",
    text: "Click to make this field editable.",
    attachTo: {
      element: "#tableCell0_maxCpuUtilization",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-32",
    text: "Click to update the edited value.",
    attachTo: {
      element: "#tableCell_0_maxCpuUtilization_cell",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-33",
    text: "Click Save to add the instance as a portfolio in the EIA application.",
    attachTo: {
      element: "#savePortfolio",
      on: "top",
    },
  },
  {
    id: "step-34",
    text: "View AMD instance recommendations with cost comparison and potential savings.",
    attachTo: {
      element: "#instanceAdvice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-35",
    text: "Click to close the cost advisory panel.",
    attachTo: {
      element: "#close-instance-advice",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-36",
    text: "Click to view Stat Collector information.",
    attachTo: {
      element: "#btn-stat-collector",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-37",
    text: "Download the Stat Collector file.",
    attachTo: {
      element: "#btn-download-stat-collector",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-38",
    text: "Click to open your user profile menu.",
    attachTo: {
      element: "#step-four-target",
      on: "right",
      offset: "0 20",
    },
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
    isEnd: true,
  },
];

export default steps;
