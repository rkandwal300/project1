export const selectInstanceResponse = (state) => state.instance.response;
export const selectInstanceResponseName = (state) =>
  state.instance.response.portfolioName;

export const selectInstanceFormData = (state) => state.instance.formData;

export const selectInstanceById = (id) => (state) =>
  state.instance.instanceStats.find((instance) => instance.id === id);

export const selectInstanceStats = (state) => state.instance.instanceStats;
export const selectSelfPrefAssessment = (state) =>
  state.instance.selfPrefAssessment;
