import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  currentInstance: null,
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
      state.currentInstance = newInstance.id;
      state.data.push(newInstance);
    } ,

    updateInstance(state, action) {
      const { id, ...updatedData } = action.payload;
      const index = state.data.findIndex((instance) => instance.id === id);

      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedData };
         state.currentInstance = state.data[index].id;
      }


    },
    deletePortfolioFromList(state, action) {
      state.data = state.data.filter(
        (instance) => instance.id !== action.payload.id
      );
    },
    addCurrentInstance(state, action) {
      state.currentInstance = action.payload;
    },
  },
});

export const {
  addInstance,
  resetInstanceState,
  updateInstance,
  getSingleInstance,
  addCurrentInstance,
  deletePortfolioFromList,
} = instanceListSlice.actions;

export default instanceListSlice.reducer;
