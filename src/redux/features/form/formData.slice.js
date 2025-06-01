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
  reset: false, // Flag to track if the form has been reset
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
    updateInstance(state, action) {
      const { index, field, value } = action.payload;
      if (state.instanceStats[index]) {
        state.instanceStats[index][field] = value;
      }
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
      state.reset= true; // Reset the form state
    },
    uploadInstance(state, action) {
      state.instanceStats = [...state.instanceStats, ...action.payload];
    },
    updateFormData(state, action) {
      const { field, value } = action.payload;
   
      state.formData[field] = value;
     
      if (field === "portfolioName") {
        state.portfolioName = value;
      }
    },
    updateResetState(state, action) {
      state.reset = action.payload;
    }
  },
});

export const {
  addInstance,
  resetForm,
  updateResetState,
  resetFormData,
  updateInstance,
  deleteInstances,
  uploadInstance,
  addSelfAssessment,
  updateFormData,
} = formDataSlice.actions;
export default formDataSlice.reducer;
