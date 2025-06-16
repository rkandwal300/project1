import {
  awsCloudWatchTelemetryData,
  azureInsightsTelemetryData,
  dataDogTelemetryData,
} from "@/lib/telemetryData";
import { createSlice } from "@reduxjs/toolkit";  

export const telemetryConnectionStatus = {
  CONNECTED: "connected",
  CONNECTING: "connecting",
  DISCONNECTED: "disconnected",
};
export const telemetryTypes = {
  DATA_DOG: "Datadog",
  AWS_CLOUDWATCH: "AWS CloudWatch",
  AZURE_INSIGHTS: "Azure App Insights",
};

const initialState = {
  data: [],
  formData: null,
  name:"",
  type: null,
  connectionStatus: telemetryConnectionStatus.DISCONNECTED,
  reset: false,
  showData: false,
  message: "",
  alertType: "info", 
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    setTelemetryData (state, action) {
      state.name = action.payload.portfolioName;
      state.formData = {...state.formData,...action.payload};
    },
    
    toggleShowData(state) {
      state.showData = !state.showData;
    },
    setTelemetryConnectionStatus(state, action) {
      state.connectionStatus = action.payload.connectionStatus;
      state.type = action.payload.type;
      switch (action.payload.type) {
        case telemetryTypes.DATA_DOG:
          state.data = dataDogTelemetryData;
          break;
        case telemetryTypes.AWS_CLOUDWATCH:
          state.data = awsCloudWatchTelemetryData;
          break;
        case telemetryTypes.AZURE_INSIGHTS:
          state.data = azureInsightsTelemetryData;
          break;
        default:
          state.data = [];
      }
    },
    toggleResetTelemetry(state) {
      state.reset = false;
    },
    resetTelemetryData(state) {
      state.data = [];
      state.type = null;
      state.connectionStatus = telemetryConnectionStatus.DISCONNECTED;
      state.reset = true;
      state.showData = false;
      state.formData = null;
      state.name = "";
      state.message = "";
    },
    
  },
});

export const {
  toggleShowData,
  setTelemetryData,
  resetTelemetryData,
  toggleResetTelemetry,
  setTelemetryConnectionStatus,
} = telemetrySlice.actions;

export default telemetrySlice.reducer;
