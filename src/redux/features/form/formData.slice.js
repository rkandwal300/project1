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
      state.formData = getDefaultInstance({
        portfolioName: action.payload.portfolioName,
      });
    },
    resetFormData(state) {
      state.formData = getDefaultInstance();
    },
    resetForm(state) {
      state.formData = getDefaultInstance();
      state.instanceStats = [];
      state.selfPrefAssessment = [];
    },
    uploadInstance(state, action) {
      state.instanceStats = [...state.instanceStats, ...action.payload];
    },
  },
});

export const {
  addInstance,
  resetForm,
  resetFormData,
  uploadInstance,
  addSelfAssessment,
} = formDataSlice.actions;
export default formDataSlice.reducer;
