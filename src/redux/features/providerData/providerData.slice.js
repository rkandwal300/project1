import { providerData } from "@/lib/region";
import { createSlice } from "@reduxjs/toolkit";

// const providerData = {
//   cloud: {
//     name: "Cloud",
//     list: {
//       aws: {
//         type: "cloud",
//         name: "AWS",
//         logo: "",
//         regions: {
//           "us-east-1": [
//             "us-east-2",
//             "us-west-1",
//             "us-west-2",
//             "ca-central-1",
//             "eu-west-1",
//           ],
//           "us-west-2": ["us-west-1", "us-east-1", "us-east-2", "sa-east-1"],
//           "eu-west-1": ["eu-west-2", "eu-west-3", "eu-central-1"],
//         },
//       },
//       azure: {
//         type: "cloud",
//         name: "Azure",
//         logo: "",
//         regions: {
//           eastus: [
//             "westus",
//             "centralus",
//             "northcentralus",
//             "southcentralus",
//             "eastus2",
//           ],
//           westus: [
//             "eastus",
//             "centralus",
//             "northcentralus",
//             "southcentralus",
//             "westus2",
//           ],
//           centralus: [
//             "eastus",
//             "westus",
//             "northcentralus",
//             "southcentralus",
//             "eastus2",
//           ],
//           northcentralus: [
//             "eastus",
//             "westus",
//             "centralus",
//             "southcentralus",
//             "eastus2",
//           ],
//           southcentralus: [
//             "eastus",
//             "westus",
//             "centralus",
//             "northcentralus",
//             "eastus2",
//           ],
//         },
//       },
//       gcp: {
//         type: "cloud",
//         name: "GCP",
//         logo: "",
//         regions: {
//           "us-central1": ["us-east1", "us-west1", "us-east4", "us-west2"],
//           "europe-west1": ["europe-west2", "europe-west3", "europe-west4"],
//           "asia-east1": ["asia-northeast1", "asia-southeast1", "asia-south1"],
//         },
//       },
//     },
//   },
//   telemetry: {
//     name: "Telemetry Connector",
//     list: {
//       datadog: {
//         name: "Datadog",
//         logo: "",
//         regions: {
//           us1: ["us2", "us3", "eu1", "ap1"],
//           us2: ["us1", "us3", "eu1", "ap1"],
//           eu1: ["us1", "us2", "ap1"],
//           ap1: ["us1", "us2", "eu1"],
//         },
//       },
//       cloudWatch: {
//         name: "AWS CloudWatch",
//         logo: "",
//         regions: {
//           us: ["eu", "ap", "ca"],
//           eu: ["us", "ap", "ca"],
//           ap: ["us", "eu", "ca"],
//           ca: ["us", "eu", "ap"],
//         },
//       },
//     },
//   },
// };

const defaultType = Object.keys(providerData)[0];

const defaultProviders = Object.keys(providerData).reduce((acc, categoryKey) => {
  const providerList = providerData[categoryKey].list;
  const providerKeys = Object.keys(providerList);

  acc[categoryKey] = providerKeys.map((key) => ({
    label: providerList[key].name,
    logo: providerList[key].logo || "",
  }));

  return acc;
}, {});

// Get the first provider and its regions for initial state
const firstProviderKey = Object.keys(providerData.cloud.list)[0]; 
const defaultRegions = providerData.cloud.list[firstProviderKey].regions;

const initialState = {
  type: defaultType,
  provider: null,
  providerList: defaultProviders,
  regions: Object.keys(defaultRegions),
  instanceTypes: Object.values(defaultRegions).flat(),
  pricingModels: ["ondemand", "reserved", "spot"],
};

const regionsSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider(state, action) {
      state.type = action.payload.type;
      state.provider = action.payload.name;
      // Optionally update regions and instanceTypes here if needed
    },
    setRegions(state, action) {
      // Implement logic if needed
    },
  },
});

export const { setProvider, setRegions } = regionsSlice.actions;
export default regionsSlice.reducer;
