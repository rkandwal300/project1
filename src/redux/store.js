import { configureStore } from '@reduxjs/toolkit'
import instanceSlice from './features/instance/instance.slice'  
import instanceListSlice from './features/instanceList/instanceList.slice'  

export const store = configureStore({
  reducer: {
    instance: instanceSlice, 
    instanceList: instanceListSlice
  },
})