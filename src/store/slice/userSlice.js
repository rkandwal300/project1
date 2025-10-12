import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../service/userService';
import { showSnackbar } from './snackbarSlice';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { dispatch }) => {
    try {
        const user = await userService.getUser();
        return user;
    } catch (error) {
        let errorMessage = "An unknown error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "API Error Occured";
        } else if (error.code === "ERR_NETWORK") {
            errorMessage = "Network Error: API is offline";
        } else if (error.request) {
            errorMessage = "API is offline (no response received)";
        }

        dispatch(showSnackbar({ text: errorMessage, color: "error" }));
        throw error; // re-throw to let the rejected case handle it
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {  } = userSlice.actions;
export default userSlice.reducer;
