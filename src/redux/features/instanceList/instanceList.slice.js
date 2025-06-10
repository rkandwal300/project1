import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentInstance: null,
  data: [],
};

const instanceListSlice = createSlice({
  name: "instanceList",
  initialState,
  reducers: {
    addInstance(state, action) {
       console.log("addInstance reducer fired"); 
 
     
      state.data.push(action.payload);
      
        state.currentInstance = action.payload.id;
        console.log("set currentInstance to", state.currentInstance);
     
      console.log("Instance added:", action.payload);
    },

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
  updateInstance, 
  addCurrentInstance,
  deletePortfolioFromList,
} = instanceListSlice.actions;

export default instanceListSlice.reducer;
