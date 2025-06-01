import { configureStore } from "@reduxjs/toolkit";
import instanceListSlice from "./features/instanceList/instanceList.slice";
import formDataSlice from "./features/form/formData.slice";

export const store = configureStore({
  reducer: {
    instanceList: instanceListSlice,
    formData: formDataSlice,
  },
});
