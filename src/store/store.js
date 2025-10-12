import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slice/uiSlice';
import snackbarReducer from './slice/snackbarSlice';
import userReducer from './slice/userSlice';

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        ui: uiReducer,
        user: userReducer,
    },
});
