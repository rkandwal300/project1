import { createSlice } from '@reduxjs/toolkit';

export const SNACKBAR_TYPE = { SUCCESS: 'success', ERROR: 'error' };


const initialState = {
    message: '',
    show: false,
    type: SNACKBAR_TYPE.SUCCESS,
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.show = true;
        },
        hideSnackbar: (state) => {
            state.show = false;
            state.message = '';
        },
        setSnackbarType: (state, action) => {
            state.type = action.payload;
        },
    },
});

export const { showSnackbar, hideSnackbar, setSnackbarType } = snackbarSlice.actions;
export default snackbarSlice.reducer;
