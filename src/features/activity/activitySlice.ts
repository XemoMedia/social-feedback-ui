import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { activityService } from '../../services/activityService'
import type { InstagramActivityPayload } from './types'

interface ActivityState {
  days: number
  data: InstagramActivityPayload | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState: ActivityState = {
  days: 30,
  data: null,
  status: 'idle',
}

export const fetchActivityAnalytics = createAsyncThunk<
  InstagramActivityPayload,
  number | undefined
>('activity/fetchActivityAnalytics', async (days, thunkAPI) => {
  const state = thunkAPI.getState() as { activity: ActivityState }
  const effectiveDays = days ?? state.activity.days
  return activityService.fetchDailyActivity(effectiveDays)
})

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setDays(state, action) {
      state.days = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityAnalytics.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(fetchActivityAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchActivityAnalytics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setDays } = activitySlice.actions
export const activityReducer = activitySlice.reducer

