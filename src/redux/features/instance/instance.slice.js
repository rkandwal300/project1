import { createSlice, nanoid } from "@reduxjs/toolkit";

// Helper to generate a default instance object
const getDefaultInstance = (data = {}) => ({
  id: null,
  portfolioName: "",
  region: "",
  instanceType: "",
  uuid: "",
  pricingModel: "",
  maxCpuUtilization: 0,
  maxMemoryUsed: 0,
  maxNetworkBandwidth: 0,
  maxDiskBandwidth: 0,
  maxIOPS: 0,
  ...data,
});

const initialState = {
  response: {
    portfolioName: "Test00Demo16",
    type: "m7a.12xLarge",
    region: "af-south-1",
    instanceType: "a9caea33-6afd-461d-a1df-7c095a247454",
    uuid: "UUID/Instance Name",
    pricingModel: "ondemand",
    maxCpuUtilization: 100,
    maxMemoryUsed: 100,
    maxNetworkBandwidth: 100,
    maxDiskBandwidth: 100,
    maxIOPS: 100,
    selfPrefAssessment: [
      {
        instanceType: "m5a.12xLarge",
        saps: 145230,
      },
    ],
  },
  formData: getDefaultInstance(),
  instanceStats: [],
  selfPrefAssessment: [],
};

const instanceSlice = createSlice({
  name: "instance",
  initialState,
  reducers: {
    createInstance: {
      reducer(state, action) {
        const {
          selfPrefAssessment = [],
          id,
          portfolioName,
          ...instance
        } = action.payload;
        if (selfPrefAssessment.length) {
          state.selfPrefAssessment.push(
            ...selfPrefAssessment.map((item) => ({
              ...item,
              id: nanoid(),
            }))
          );
        }
        state.instanceStats.push({...instance,id});
        state.formData = getDefaultInstance({ portfolioName,id });
      },
      // prepare(instance) {
      //   return {
      //     payload: {
      //       ...instance,
           
      //     },
      //   };
      // },
    },
    updateFormData(state, action) {
      if (action.payload && Object.keys(action.payload).length) {
        state.formData = { ...state.formData, ...action.payload };
      }
    },

    updateSelfPrefAssessment(state, action) {
      state.selfPrefAssessment = action.payload || [];
    },

    updateInstance(state, action) {
      const { id, ...updates } = action.payload;
      const inst = state.instanceStats.find((inst) => inst.id === id);
      if (inst) {
        Object.assign(inst, updates);
      }
    },
    resetFormData(state) {
      state.formData = getDefaultInstance();
      state.selfPrefAssessment = [];
      state.response = initialState.response;
      state.instanceStats = [];
    },
    resetInstanceState(state) {
      state.formData = getDefaultInstance();
      state.instanceStats = [];
      state.selfPrefAssessment = [];
      state.response = initialState.response;
    },
    setInstanceStats(state, action) {
      state.instanceStats = action.payload?.instanceStats ?? [];
    },
    setResponse(state, action) {
      state.response = { ...state.response, ...action.payload };
    },
  },
});

export const {
  resetInstanceState,
  createInstance,
  updateInstance,
  updateFormData,
  resetFormData,
  setInstanceStats,
  setResponse,
  updateSelfPrefAssessment,
} = instanceSlice.actions;

export default instanceSlice.reducer;
