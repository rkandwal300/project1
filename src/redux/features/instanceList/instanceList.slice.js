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
        id: nanoid(),
        ...action.payload,
      };
      console.log({ newInstance });
      state.data = [...state.data, newInstance];
    },

    updateInstance(state, action) {
      const index = state.data.findIndex(
        (instance) => instance.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    deletePortfolioFromList(state, action) {
      const index = state.data.findIndex(
        (instance) => instance.id === action.payload.id
      );
      if (index === -1) return; // If the instance is not found, do nothing

      // Remove the instance from the list
      console.log("Deleting instance with id:", action.payload.id);
      state.data = state.data.splice(index, 1);
      console.log("Updated instance list:", state.data);
    },
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
