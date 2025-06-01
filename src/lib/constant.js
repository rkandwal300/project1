export const regionOptions = [
  "af-south-1",
  "ap-east-1",
  "ap-northeast-1",
  "ap-northeast-2",
  "ap-northeast-3",
  "ap-south-1",
  "ap-south-2",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-southeast-3",
  "ap-southeast-4",
  "ap-southeast-5",
  "ca-central-1",
  "eu-central-1",
  "eu-central-2",
  "eu-north-1",
];

export const instanceOptions = [
    "t2.nano",
    "m7a.12xLarge",
  "m7a.16xLarge",
  "c5.large",
  "c5.xlarge",
  "c5.2xlarge",
  "c5.4xlarge",
  "c5.9xlarge",
  "c5.12xlarge",
  "c5.18xlarge",
  "c5.24xlarge",
  "c5.metal",
  "c5a.large",
  "c5a.xlarge",
  "c5a.2xlarge",
  "c5a.4xlarge",
  "c5a.8xlarge",
  "c5a.12xlarge",
  "c5a.16xlarge",
  "c5a.24xlarge",
  "c5ad.large",
  "c5ad.xlarge",
];

export const pricingModelOptions = ["ondemand", "reserved"];


export const CONSUMPTION_FIELDS = [
  { label: "Max CPU %", name: "maxCpuUtilization",tooltipMessage: "Maximum CPU Utilization (%)." },
  { label: "Max Mem", name: "maxMemoryUsed" ,tooltipMessage: "Maximum Memory Used (Gigabyte/sec)." },
  { label: "Max Network BW", name: "maxNetworkBandwidth" ,tooltipMessage: "Maximum Network Bandwidth (Megabyte/sec)." },
  // { label: "Max Network IOPS", name: "maxNetworkIOPS" ,tooltipMessage: "Max Network Bandwidth (Megabyte/sec)." },
  { label: "Max Disk BW", name: "maxDiskBandwidth",tooltipMessage: "Maximum Disk Bandwidth (Megabyte/sec)." },
  { label: "Max IOPS", name: "maxIOPS" , tooltipMessage:"Maximum Disk IOPS." },
];


export const GENERIC_FIELDS = [
    {
      name: "region",
      label: "Region",
      options: regionOptions,
      tooltipMessage: "Select Region associated with CSP",
    },
    {
      name: "instanceType",
      label: "Instance Type",
      options: instanceOptions,
      tooltipMessage: "Select Instance associated with Region",
    },
    {
      name: "uuid",
      label: "UUID/Instance Name",
      tooltipMessage: "Enter UUID/Instance Name, For Ex: VM for AI/ML server",
    },
    {
      name: "pricingModel",
      label: "Pricing Model",
      options: pricingModelOptions,
      tooltipMessage: "Pricing Model",
    },
  ];

export const CONSUMPTION_TOUR_STEPS = [
  {
    id: "step-sixth",
    text: "This is the Sixth step.",
    attachTo: { element: "#sixthStepTarget", on: "top" },
    next: "step-seventh",
    prev: "step-eight",
    field: "region",
  },
  {
    id: "step-seventh",
    text: "This is the seventh step - choose an Instance Type.",
    attachTo: { element: "#seventhStepTarget", on: "top" },
    next: "step-eight",
    prev: "step-sixth",
    field: "instanceType",
  },
  {
    id: "step-eight",
    text: "This is the eight step - give an Instance name.",
    attachTo: { element: "#eightStepTarget", on: "top" },
    next: "step-nine",
    prev: "step-seventh",
    field: "uuid",
  },
  {
    id: "step-nine",
    text: "This is the nine step - give an Instance name.",
    attachTo: { element: "#nineStepTarget", on: "top" },
    next: "step-tenth",
    prev: "step-eight",
    field: "pricingModel",
  },
  {
    id: "step-tenth",
    text: "This is the tenth step - review pricing model.",
    attachTo: { element: "#tenthStepTarget", on: "top" },
    next: "step-eleventh",
    prev: "step-nine",
    field: "pricingModel",
  },
];

export const GENERIC_TOUR_STEPS = [
  {
    id: "step-three",
    text: "This is the three step.",
    attachTo: { element: "#thirdStepTarget", on: "top" },
    field: "region",
    next: "step-four",
    prev: "step-two",
  },
  {
    id: "step-four",
    text: "This is the four step - choose an Instance Type.",
    attachTo: { element: "#fourthStepTarget", on: "top" },
    field: "instanceType",
    next: "step-fifth",
    prev: "step-three",
  },
  {
    id: "step-fifth",
    text: "This is the four step - give an Instance name.",
    attachTo: { element: "#fifthStepTarget", on: "top" },
    field: "uuid",
    next: "step-sixth",
    prev: "step-four",
  },
  {
    id: "step-sixth",
    text: "This is the four step - give an Instance name.",
    attachTo: { element: "#sixthStepTarget", on: "top" },
    field: "pricingModel",
    next: "step-sixth", // Consider updating if this is not the last step
    prev: "step-four",
  },
];
