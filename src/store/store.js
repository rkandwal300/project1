import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slice/uiSlice';
import snackbarReducer from './slice/snackbarSlice';

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        ui: uiReducer,
    },
});
