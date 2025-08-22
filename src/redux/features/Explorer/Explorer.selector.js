
export const selectInstancesByRegion = (state, regionName) => {
  const data = state?.selectorData?.data;
  if (!Array.isArray(data)) return [];
  return data.filter((item) => item.region === regionName);
};

export const selectAllSelectorData = (state) => state?.selectorData || {};

export const selectRegions = (state) => {
  const data = state?.explorerData?.data;
  if (!Array.isArray(data)) return [];
  const uniqueRegions = [...new Set(data.map((item) => item.region))];
  return uniqueRegions;
};

export const selectDataByRegion = (state) => {
  const region = state?.explorerData?.selectedRegion;
  const data = state?.explorerData?.data;
  if (!region || !Array.isArray(data)) return [];
  return data.filter((item) => item.region === region);
};