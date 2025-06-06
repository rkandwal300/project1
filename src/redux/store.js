import { configureStore } from "@reduxjs/toolkit";
import instanceListSlice from "./features/instanceList/instanceList.slice";
import formDataSlice from "./features/form/formData.slice";
import menuSlice from "./features/menu/menu.slice";
import sidebarSlice from "./features/sidebar/sidebar.slice";

export const store = configureStore({
  reducer: {
    instanceList: instanceListSlice,
    formData: formDataSlice,
    menu: menuSlice,
    sidebar: sidebarSlice,
  },
});
