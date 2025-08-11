import { createSelector } from '@reduxjs/toolkit';

const selectCustomizeTable = state => state.customizeTable;

export const selectTableColumns = createSelector(
    [selectCustomizeTable],
    customizeTable => customizeTable.columns
);

export const selectTableSettings = createSelector(
    [selectCustomizeTable],
    customizeTable => customizeTable.settings
);

export const selectVisibleColumns = createSelector(
    [selectTableColumns],
    columns => columns.filter(col => col.visible)
);

export const selectTableSort = createSelector(
    [selectCustomizeTable],
    customizeTable => customizeTable.sort
);
export const selectTableisGrid = createSelector(
    [selectCustomizeTable],
    customizeTable => customizeTable.isGrid
);