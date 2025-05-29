import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: "1",
      portfolioName: "Test00Demo16",
    },
    {
      id: "2",
      portfolioName: "Test00Demo17",
    },
    {
      id: "3",
      portfolioName: "Test00Demo18",
    },
    {
      id: "4",
      portfolioName: "Test00Demo19",
    },
    {
      id: "5",
      portfolioName: "Test00Demo20",
    },
    {
      id: "6",
      portfolioName: "Test00Demo21",
    },
    
  ],
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
