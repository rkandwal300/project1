import { createSlice } from "@reduxjs/toolkit";

const instanceSlice = createSlice({
  name: "instance",
  initialState: {
    response: {
      portfolioName: "Test00Demo16",
      region: "af-south-1",
      instanceType: "a9caea33-6afd-461d-a1df-7c095a247455",
      uuid: "UUID/Instance Name",
      pricingModel: "ondemand",
      maxCpuUtilization: 100,
      maxMemoryUsed: 100,
      maxNetworkBandwidth: 100,
      maxDiskBandwidth: 100,
      maxIOPS: 100,
    },
    instanceStats: [],
  },

  reducers: {
    addInstance(state, action) {
      state.push({
        id: state.instanceStats.length + 1,
        ...action.payload,
      });
    },
    updateInstance(state, action) {
      const index = state.instanceStats.findIndex(
        (instance) => instance.id === action.payload.id
      );
      if (index !== -1) {
        state.instanceStats[index] = {
          ...state.instanceStats[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addInstance, updateInstance } = instanceSlice.actions;
export default instanceSlice.reducer;
