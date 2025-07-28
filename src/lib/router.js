const getBasePath = () => {
  const port = window.location.port;
  const ccaPorts = ["3000", "3001", "3002"];
  const eiaPorts = ["2000", "2001", "2002"];

  if (ccaPorts.includes(port)) {
    return "/cca";
  } else if (eiaPorts.includes(port)) {
    return "/eia";
  }

  // In production, check domain or use build-time base path
  const hostname = window.location.hostname;
  if (hostname.includes("cca")) {
    return "/";
  } else if (hostname.includes("eia")) {
    return "/";
  }
  return "/eia";
};

export const basePath = getBasePath();

export const ROUTES = {
  ROOT: `${basePath}/`,
  MANAGE_PORTFOLIO: `${basePath}`,
  CLOUD_USAGE_REPORT: `${basePath}/cloudusagereports`,
  CLOUD_USAGE_REPORT_DETAILS: `${basePath}/cloudusagereports/:id`,
  COST_ADVISORY: `${basePath}-costAdvisory`,
  EXPLORER: `${basePath}-explorer`,
  SUPPORT: `/support`,
  RELEASE_NOTES: `/release-notes`,
  MAIN_CONTENT_DYNAMIC: `${basePath}/:id`,
  INSTANCE_ADVICE: `/instanceAdvice`,
  TELEMETRY: `/telemetry`,
  TELEMETRY_DETAIL: `/telemetry/:id`,
  NOT_FOUND: "*",
};
