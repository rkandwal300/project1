export const getProviderConfig = (routes, type) => {
  if (routes.includes("telemetry")) {
    return {
      type: "telemetry",
      name: type || "Datadog",
    };
  }
  return {
    type: "cloud",
    name: type || "aws",
  };
};
