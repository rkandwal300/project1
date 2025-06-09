import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
    instances: [],
    selfAssessment:"",
    selfAssessmentLoading: false,
    name: '',
    loading: false,
    error: null,
    message: '',
};

const instanceSlice = createSlice({
    name: 'instance',
    initialState,
    reducers: {
        fetchInstancesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchInstancesSuccess(state, action) {
            state.loading = false;
            state.instances = action.payload;
        },
        fetchInstancesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addInstance(state, action) {
            state.instances.push(action.payload);
        },
        removeInstance(state, action) {
            state.instances = state.instances.filter(
                (instance) => instance.id !== action.payload
            );
        },
        resetMessage(state) {
            state.message = '';
        }
    },
});

export const {
    fetchInstancesStart,
    fetchInstancesSuccess,
    fetchInstancesFailure,
    addInstance,
    removeInstance,
} = instanceSlice.actions;

export default instanceSlice.reducer;