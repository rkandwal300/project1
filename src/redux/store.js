import { configureStore } from "@reduxjs/toolkit";
import instanceListReducer from "./features/instanceList/instanceList.slice"; 
import sidebarReducer from "./features/sidebar/sidebar.slice";
import instanceReducer from "./features/instance/instance.slice";

export const store = configureStore({
  reducer: {
    instanceList: instanceListReducer,
    instance: instanceReducer, 
    sidebar: sidebarReducer,
  },
});
