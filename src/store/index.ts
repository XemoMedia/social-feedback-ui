import { configureStore } from '@reduxjs/toolkit'
import { analyticsReducer } from '../features/analytics/analyticsSlice'
import { activityReducer } from '../features/activity/activitySlice'

export const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
    activity: activityReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
