import { configureStore } from '@reduxjs/toolkit'
import instanceSlice from './features/instance/instance.slice'  

export const store = configureStore({
  reducer: {
    instance: instanceSlice, 
  },
})