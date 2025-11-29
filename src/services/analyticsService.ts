import type { AnalyticsPayload, RangeOption } from '../features/analytics/types'
import { axiosClient } from './axiosClient'

const rangeToDays: Record<RangeOption, number> = {
  Day: 1,
  Week: 7,
  Month: 30,
  Year: 365,
}

export const analyticsService = {
  async fetchAnalytics(range: RangeOption): Promise<AnalyticsPayload> {
    const days = rangeToDays[range]

    try {
      const { data } = await axiosClient.get<AnalyticsPayload>('/api/v1/sentiment/dashboard', {
        params: { days },
      })
      return data
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load analytics'
      throw new Error(message)
    }
  },
}

