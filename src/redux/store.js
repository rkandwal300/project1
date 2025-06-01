import { configureStore } from "@reduxjs/toolkit";
import instanceSlice from "./features/instance/instance.slice";
import formDataSlice from "./features/form/formData.slice";

export const store = configureStore({
  reducer: {
    instance: instanceSlice,
    formData: formDataSlice,
  },
});
