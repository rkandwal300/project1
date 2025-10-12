import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackData: {
        timeout: 5000,
        text: 'working',
        snackbar: false,
        color: 'green',
    },
    pageLoadingState: false,
    isUserLoggedIn: false,
    user: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        updateSnackData: (state, action) => {
            state.snackData = action.payload;
        },
        SET_pageLoadingState: (state, action) => {
            state.pageLoadingState = action.payload;
        },
        toggleUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload;
        },
        setUserData: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { updateSnackData, SET_pageLoadingState, setUserData, toggleUserLoggedIn } = uiSlice.actions;
export default uiSlice.reducer;
