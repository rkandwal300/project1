import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const instanceListSlice = createSlice({
  name: "instanceList",
  initialState,
  reducers: {
    addInstance(state, action) {
      const newInstance = {
        ...action.payload,
        id: nanoid(),
      }; 
      state.data = [...state.data, newInstance];
    },

    updateInstance(state, action) {
      const { id, ...updatedData } = action.payload;
      const index = state.data.findIndex((instance) => instance.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedData };
      }
    },
    deletePortfolioFromList(state, action) {
      state.data = state.data.filter(
        (instance) => instance.id !== action.payload.id
      );
    }
  },
});

export const {
  addInstance,
  resetInstanceState,
  updateInstance,
  getSingleInstance,
  deletePortfolioFromList,
} = instanceListSlice.actions;

export default instanceListSlice.reducer;
