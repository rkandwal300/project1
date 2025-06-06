import { openSidebar } from "@/redux/features/sidebar/sidebar.slice";
import { store } from "@/redux/store";

const steps = () => [
  {
    id: "step-1",
    text: "Click on This Button to check previous releases",
    attachTo: {
      element: "#step-one-target",
      on: "bottom",
      offset: "0 10",
    },
  },
  {
    id: "step-2",
    text: "Click here to close this dialog",
    attachTo: {
      element: "#step-two-target",
      on: "top",
      offset: "0 20",
    },
    type: "wait",
  },
  {
    id: "step-3",
    text: "Click here to open the support menu",
    attachTo: {
      element: "#step-three-target",
      on: "right",
    },
    offset: "0 20",
  },
  {
    id: "step-4",
    text: "You can find all support options here",
    attachTo: {
      element: "#step-three-target",
      on: "right",
      offset: "0 20",
    },
  },
  {
    id: "step-5",
    text: "Click here to open the user profile menu",
    attachTo: {
      element: "#step-four-target",
      on: "right",
      offset: "0 20",
    },
  },
  {
    id: "step-6",
    text: "You can find all user profile settings here",
    attachTo: {
      element: "#step-four-target",
      on: "right",
    },
  },
  {
    id: "step-7",
    text: "Click here to open download menu",
    attachTo: {
      element: "#step-five-target",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-8",
    text: "Download the template in Excel (.xlsx) format to ensure your data is formatted correctly. All required fields must be  filled in as per the template structure.",
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
    text: "Click here to open service Provider",
    attachTo: {
      element: "#step-six-target",
      on: "left",
    },
    type: "wait",
  },
  {
    id: "step-9.1",
    text: "Click here to select service Provider",
    attachTo: {
      element: "#MenuItem-azure",
      on: "left",
    },
    type: "wait",
  },
  {
    id: "step-10",
    text: "Click here to enter the name of your portfolio. This name will be used to identify your portfolio in the system.",
    attachTo: {
      element: "#portfolio-name",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-11",
    text: "Upload your complete instance file here. Maximum file limit is 20,000 records.Once uploaded, the data will be automatically uploaded in the table row below.",
    attachTo: {
      element: "#uploadInstances",
      on: "bottom",
    },
  },
  {
    id: "step-12",
    text: "Click on save, your instance will added as a Portfolio with EIA application.",
    attachTo: {
      element: "#savePortfolio",
      on: "top",
    },
  },
  {
    id: "step-13",
    text: "Click Delete Portfolio to remove the selected Portfolio.",
    attachTo: {
      element: "#deletePortfolio",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-14",
    text: "Click here to cancel deletion of this portfolio.",
    attachTo: {
      element: "#cancelDeletePortfolio",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-15",
    text: "Get AMD instance recommendations with cost comparison and potential savings.",
    attachTo: {
      element: "#instanceAdvice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-16",
    text: "Export the cost advice data as an Excel(.xlsx) file for offline analysis and reporting.",
    attachTo: {
      element: "#btn-cost-advice-export",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-17",
    text: "click here to view the summary of the cost advice data.",
    attachTo: {
      element: "#summary-accordion-header",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-17",
    text: "Click here to close the summary of the cost advice data.",
    attachTo: {
      element: "#summary-accordion-header",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-18",
    text: "Click here to see annually price ",
    attachTo: {
      element: "#annuallyPrice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-19",
    text: "Click here to see monthly price.",
    attachTo: {
      element: "#annuallyPrice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-20",
    text: "Click here to scroll cost advisory table.",
    attachTo: {
      element: "#instance-advice-table",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-21",
    text: "Click here to scroll cost advisory table.",
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
            offset: [100, 10], // [x-offset, y-offset] → moves right and down
          },
        },
      ],
    },
  },
  {
    id: "step-22",
    text: "Click here to scroll cost advisory table.",
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
    text: "Click here to scroll cost advisory table.",
    attachTo: {
      element: "#close-instance-advice",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-24",
    text: "Click here to create a new Portfolio.",
    attachTo: {
      element: "#btn-dashboard-createPortfolio",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-25",
    text: "Click here to enter the name of your portfolio. This name will be used to identify your portfolio in the system.",
    attachTo: {
      element: "#portfolio-name",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-25",
    text: "You can manually enter instance details using  the input fields provided. Ensure all mandatory fields marked with  an asterisk (*) are complete before saving.",
    attachTo: {
      element: "#generic-metadata-form",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-25",
    text: "You can manually enter instance details using  the input fields provided. Ensure all mandatory fields marked with  an asterisk (*) are complete before saving.",
    attachTo: {
      element: "#consumption-metadata-form",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-26",
    text: "Adds a new VM entry to the list using the filled inputs fields. Ensure all Fields are completed before clicking this button.",
    attachTo: {
      element: "#addInstanceFormTarget",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-27",
    text: "Adds a new VM entry to the list using the filled inputs fields. Ensure all Fields are completed before clicking this button.",
    attachTo: {
      element: "#addInstanceFormTarget",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-27",
    text: "Replaces the selected VM entry with the new values entered in the input values.Select a row first, then update the fields and click Replace.",
    attachTo: {
      element: "#findAndReplace",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-28",
    text: "Click here to select a value of instance type which you want to change.",
    attachTo: {
      element: "#instanceTypeTargetFrom",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-29",
    text: "Click here to select a value of instance type with new value.",
    attachTo: {
      element: "#instanceTypeTargetTo",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-30",
    text: "Click here to save changes.",
    attachTo: {
      element: "#ReplaceAllButton",
      on: "bottom",
    },
    type: "wait",
  },
  {
    id: "step-31",
    text: "Click here to open editable field.",
    attachTo: {
      element: "#tableCell0_maxCpuUtilization",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-32",
    text: "Click here to update editable field.",
    attachTo: {
      element: "#tableCell_0_maxCpuUtilization_cell",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-33",
    text: "Click on save, your instance will added as a Portfolio with EIA application.",
    attachTo: {
      element: "#savePortfolio",
      on: "top",
    },
  },
  {
    id: "step-34",
    text: "Get AMD instance recommendations with cost comparison and potential savings.",
    attachTo: {
      element: "#instanceAdvice",
      on: "top",
    },
    type: "wait",
  },
  {
    id: "step-35",
    text: "Click here to close cost advisory details.",
    attachTo: {
      element: "#close-instance-advice",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-36",
    text: "Click here for stat collector details.",
    attachTo: {
      element: "#btn-stat-collector",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-37",
    text: "Click here to download stat collector file.",
    attachTo: {
      element: "#btn-download-stat-collector",
      on: "bottom",
    },

    type: "wait",
  },
  {
    id: "step-38",
    text: "Click here to open the user profile menu",
    attachTo: {
      element: "#step-four-target",
      on: "right",
      offset: "0 20",
    },
  },
  {
    id: "step-39",
    text: "Click here to log out of application",
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
