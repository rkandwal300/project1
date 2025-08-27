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

  const envMap = {
    "d1dedbwm6ntaya.cloudfront.net": "cca",
    "d2008bczhvnw5c.cloudfront.net": "eia"
  };

  const env = envMap[hostname];
  if (env === "cca") {
    return "/";
  } else if (env === "eia") {
    return "/";
  } else {
    // Default or unknown
    console.warn("Unknown environment:", hostname);
    return "/";
  }
};

export const basePath = getBasePath();

export const ROUTES = {
  ROOT: `${basePath}/`,
  DETAIL: `${basePath}/:id`,
  MANAGE_PORTFOLIO: `${basePath}`,
  CLOUD_USAGE_REPORT: `${basePath}/cca-cloudusagereports`,
  CLOUD_USAGE_REPORT_DETAILS: `${basePath}/cloudusagereports/:id`,
  COST_ADVISORY: `${basePath}/costAdvisory`,
  EXPLORER: `${basePath}/explorer`,
  SUPPORT: `${basePath}/support`,
  RELEASE_NOTES: `${basePath}/release-notes`,
  MAIN_CONTENT_DYNAMIC: `${basePath}/:id`,
  INSTANCE_ADVICE: `${basePath}/instanceAdvice`,
  TELEMETRY: `${basePath}/telemetry`,
  TELEMETRY_DETAIL: `${basePath}/telemetry/:id`,
  NOT_FOUND: "*",
};

// utils.js // utils/urlUtils.js

export function isCCA() {
  if (typeof window === 'undefined') return false;
  return window.location.href.includes('cca') || window.location.hostname.includes('cca');
}

export function isEIA() {
  if (typeof window === 'undefined') return false;
  return window.location.href.includes('eia') || window.location.hostname.includes('eia');
}