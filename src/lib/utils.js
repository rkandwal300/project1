import { CLOUD_TYPES, TELEMETRY_TYPES } from "@/redux/features/telemetry/telemetry.slice";

export const getProviderConfig = (routes, type) => {
  if (routes.includes("telemetry")) {
    return {
      type: "telemetry",
      name: type || TELEMETRY_TYPES.DATA_DOG,
    };
  }
  return {
    type: "cloud",
    name: type ||CLOUD_TYPES.AWS,
  };
};
