import { CostAdvisoryColumn } from '@/components/shared/cca/costAdvice/CostAdvisoryColumn';
import { instanceAdvisoryColumn } from '@/components/shared/InstanceAdvice/instanceAdvisoryColumn';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    instanceVisibleColumns: instanceAdvisoryColumn
        .flatMap(col => col.columns)
        .reduce((acc, col) => {
            acc[col.id] = true;
            return acc;
        }, {}),
    costVisibleColumns: CostAdvisoryColumn.flatMap(col => col.columns)
        .reduce((acc, col) => {
            acc[col.id] = true;
            return acc;
        }, {}),
    isGrid: false
};

const customizeTableSlice = createSlice({
    name: 'customizeTable',
    initialState,
    reducers: {
        toggleInstanceColumnVisibility(state, action) {
            state.instanceVisibleColumns = { ...state.instanceVisibleColumns, ...action.payload };
        },
        toggleCostColumnVisibility(state, action) {
            state.costVisibleColumns = { ...state.costVisibleColumns, ...action.payload };
        },
        setGridView(state, action) {
            state.isGrid = action.payload; // true for grid, false for list
        },
        resetCustomizeTableColumn(state) {  // pass columns array in payload
            state.instanceVisibleColumns = instanceAdvisoryColumn
                .flatMap(col => col.columns)
                .reduce((acc, col) => {
                    acc[col.id] = true;
                    return acc;
                }, {});
            state.costVisibleColumns = CostAdvisoryColumn
                .flatMap(col => col.columns)
                .reduce((acc, col) => {
                    acc[col.id] = true;
                    return acc;
                }, {});

        },
    },
});

export const {
    setGridView,
    toggleInstanceColumnVisibility,
    toggleCostColumnVisibility,
    resetCustomizeTableColumn,
} = customizeTableSlice.actions;

export default customizeTableSlice.reducer;
