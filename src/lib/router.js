const getBasePath = () => {
  const port = window.location.port;
  const ccaPorts = ["3000", "3001", "3002"];
  const eiaPorts = ["2000", "2001", "2002"];
 console.log({port})
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

export function isEIA(){
  if (typeof window === 'undefined') return false;
  return window.location.href.includes('eia') || window.location.hostname.includes('eia');
}