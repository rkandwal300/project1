import { telemetryTypes } from "@/redux/features/telemetry/telemetry.slice";

export const getProviderConfig = (routes, type) => {
  if (routes.includes("telemetry")) {
    return {
      type: "telemetry",
      name: type || telemetryTypes.DATA_DOG,
    };
  }
  return {
    type: "cloud",
    name: type ||"AWS",
  };
};
