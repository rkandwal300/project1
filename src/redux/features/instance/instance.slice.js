import { createSlice } from "@reduxjs/toolkit";

export const errorMessageType = {
  ERROR: "error",
  SUCCESS: "success",
};

const initialState = {
  instances: [],
  selfAssessment: "",
  selfAssessmentLoading: false,
  name: "",
  loading: false,
  error: null,
  message: "",
  reset: false,
  messageType: null,
};

const instanceSlice = createSlice({
  name: "instance",
  initialState,
  reducers: {
    addInstanceList(state, action) {
      state.instances = [...state.instances, ...action.payload];
    },
    addSelfAssessmentList(state, action) {
      state.selfAssessment = [...state.selfAssessment, ...action.payload];
    },
    addInstance(state, action) {
      state.instances.push(action.payload);
    },
    findAndReplace(state, action) {
      state.instances = action.payload;
    },
    removeInstance(state, action) {
      state.instances = state.instances.filter(
        (_, index) => !action.payload.includes(index)
      );
    },
    setPortFolioName(state, action) {
      state.name = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload.message;
      state.messageType = action.payload.type;
    },
    resetMessage(state) {
      state.message = "";
    },
    resetInstanceState(state) {
      state.instances = [];
      state.selfAssessment = [];
      state.name = "";
      state.loading = false;
      state.error = null;
      state.message = "";
      state.reset = true;
    },
    setResetState(state, action) {
      state.reset = action.payload;
    },
    updateInstanceState(state, action) {
      const { name, instances, selfPrefAssessment } = action.payload;
      state.name = name;
      state.selfAssessment = selfPrefAssessment;
      state.instances = instances;
    },
        updateSingleInstance(state, action) {
      const { index, field, value } = action.payload;
      if (state.instances[index]) {
        state.instances[index][field] = value;
      }
    },
     
  },
});

export const {
  addInstance,
  setMessage,
  setResetState,
  findAndReplace,
  removeInstance,
  addInstanceList,
  setPortFolioName,
  resetInstanceState,
  updateInstanceState,
  updateSingleInstance,
  addSelfAssessmentList,
} = instanceSlice.actions;

export default instanceSlice.reducer;
