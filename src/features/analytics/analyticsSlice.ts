import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { analyticsService } from '../../services/analyticsService'
import type { AnalyticsPayload, RangeOption } from './types'

interface AnalyticsState {
  range: RangeOption
  data: AnalyticsPayload | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState: AnalyticsState = {
  range: 'Month',
  data: null,
  status: 'idle',
}

export const fetchAnalytics = createAsyncThunk<
  AnalyticsPayload,
  RangeOption | undefined
>('analytics/fetchAnalytics', async (range, thunkAPI) => {
  const state = thunkAPI.getState() as { analytics: AnalyticsState }
  const effectiveRange = range ?? state.analytics.range
  return analyticsService.fetchAnalytics(effectiveRange)
})

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setRange(state, action) {
      state.range = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setRange } = analyticsSlice.actions
export const analyticsReducer = analyticsSlice.reducer

