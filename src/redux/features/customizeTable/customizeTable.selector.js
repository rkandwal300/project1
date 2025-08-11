import { createSelector } from '@reduxjs/toolkit';

const selectCustomizeTable = state => state.customizeTable;

export const selectInstanceTableColumns = createSelector(
    [selectCustomizeTable],
    customizeTable => customizeTable.instanceVisibleColumns
);
export const selectCostTableColumns = createSelector(
    [selectCustomizeTable],
    customizeTable => customizeTable.costVisibleColumns
);

export const selectTableisGrid = createSelector(
    [selectCustomizeTable],
    customizeTable => customizeTable.isGrid
);