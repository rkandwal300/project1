import { createSlice } from "@reduxjs/toolkit";

export const mockFormDataResponse = {
  portfolioName: "Test00Demo16",
  region: "ap-east-1",
  instanceType: "m7a.12xLarge",
  uuid: "ghgfhfg",
  pricingModel: "reserved",
  id: "yhG_7_KsqZNeKgPJn6b09",
  maxCpuUtilization: 123,
  maxMemoryUsed: 321,
  maxNetworkBandwidth: 987,
  maxDiskBandwidth: 656,
  maxIOPS: 889,
};

export const getDefaultInstance = (data = {}) => ({
  // id: null,
  portfolioName: "",
  region: "",
  instanceType: "",
  uuid: "",
  pricingModel: "",
  ...data,
});

const initialState = {
  portfolioName: "",
  formData: getDefaultInstance(),
  instanceStats: [],
  selfPrefAssessment: [],
  portfolioNameList: [],
  reset: false,
  hideInstances: false,
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    addSelfAssessment(state, action) {
      state.selfPrefAssessment = [
        ...state.selfPrefAssessment,
        ...action.payload,
      ];
    },

    addInstance(state, action) {
      state.portfolioName = action.payload.portfolioName;
      state.instanceStats = [
        ...state.instanceStats,
        { ...state.formData, ...action.payload },
      ];
      state.hideInstances = false;
      state.formData = getDefaultInstance({
        portfolioName: action.payload.portfolioName,
      });
    },

    updateSingleInstance(state, action) {
      const { index, field, value } = action.payload;
      if (state.instanceStats[index]) {
        state.instanceStats[index][field] = value;
      }
    },
    uploadInstance(state, action) {
      state.instanceStats = [...state.instanceStats, ...action.payload];
      state.hideInstances = false;
    },
    deleteInstances(state, action) {
      state.instanceStats = state.instanceStats.filter(
        (_, index) => !action.payload.includes(index)
      );
    },
    resetFormData(state) {
      state.formData = getDefaultInstance();
    },
    resetForm(state) {
      state.formData = getDefaultInstance();
      state.instanceStats = [];
      state.selfPrefAssessment = [];
      state.portfolioName = "";
      state.reset = true; // Reset the form state
    },
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };

      if (Object.keys(action.payload).includes("portfolioName")) {
        state.portfolioName = action.payload["portfolioName"];
      }
    },
    updateResetState(state, action) {
      state.reset = action.payload;
    },
    toggleHideInstances(state, action) {
      state.hideInstances = action.payload;
    },

    findAndReplace(state, action) {
      state.instanceStats = action.payload;
    },

    addPortfolioNameList(state, action) {
      state.portfolioNameList.push(action.payload);
    },
  },
});

export const {
  addInstance,
  addPortfolioNameList,
  findAndReplace,
  resetForm,
  updateResetState,
  resetFormData,
  updateSingleInstance,
  deleteInstances,
  uploadInstance,
  addSelfAssessment,
  updateFormData,
  toggleHideInstances,
} = formDataSlice.actions;
export default formDataSlice.reducer;
