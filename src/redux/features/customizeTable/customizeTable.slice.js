import { CostAdvisoryColumn } from '@/components/shared/cca/costAdvice/CostAdvisoryColumn';
import { instanceAdvisoryColumn } from '@/components/shared/InstanceAdvice/CostAdvisoryColumn';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    instanceVisibleColumns: instanceAdvisoryColumn.flatMap(col => col.id).reduce((acc, id) => {
        acc[id] = true; // All columns are visible by default   
        return acc;
    }, {}),
    costVisibleColumns: CostAdvisoryColumn.flatMap(col => col.id).reduce((acc, id) => {
        acc[id] = true; // All columns are visible by default
        return acc;
    }, {}),
    isGrid: false
};

const customizeTableSlice = createSlice({
    name: 'customizeTable',
    initialState,
    reducers: {
        toggleInstanceColumnVisibility(state, action) {
            const column = action.payload;
            state.instanceVisibleColumns[column] = !state.instanceVisibleColumns[column];
        },
        toggleCostColumnVisibility(state, action) {
            const column = action.payload;
            state.costVisibleColumns[column] = !state.costVisibleColumns[column];
        },
        toggleGridView(state) {
            state.isGrid = !state.isGrid;
        },
        resetCustomizeTableColumn(state, action) {
            const columns = action.payload; // pass columns array in payload
            state.instanceVisibleColumns = {};
            state.costVisibleColumns = {};
            columns.forEach(col => {
                state.instanceVisibleColumns[col] = true;
                state.costVisibleColumns[col] = true;
            });
        },
    },
});

export const {
    toggleGridView,
    toggleInstanceColumnVisibility,
    toggleCostColumnVisibility,
    resetCustomizeTableColumn,
} = customizeTableSlice.actions;

export default customizeTableSlice.reducer;
