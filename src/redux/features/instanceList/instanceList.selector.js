export const selectInstanceList = (state) => state.instanceList.data;
export const selectCurrentInstance = (state) =>state?.currentInstance !== null ?
  state.instanceList.data.find((val) => val.id === state?.currentInstance) : null;
