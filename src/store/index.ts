import { configureStore } from '@reduxjs/toolkit'
import { analyticsReducer } from '../features/analytics/analyticsSlice'

export const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

