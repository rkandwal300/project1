import { configureStore } from "@reduxjs/toolkit";
import instanceListReducer from "./features/instanceList/instanceList.slice";
import sidebarReducer from "./features/sidebar/sidebar.slice";
import instanceReducer from "./features/instance/instance.slice";
import providerDataReducer from "./features/providerData/providerData.slice";
import telemetryReducer from "./features/telemetry/telemetry.slice";
import customizeTableReducer from "./features/customizeTable/customizeTable.slice";

export const store = configureStore({
  reducer: {
    instanceList: instanceListReducer,
    instance: instanceReducer,
    sidebar: sidebarReducer,
    provider: providerDataReducer,
    telemetry: telemetryReducer,
    customizeTable: customizeTableReducer,
  },
});
