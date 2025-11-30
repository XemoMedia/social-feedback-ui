import type { InstagramActivityPayload } from '../features/activity/types'
import { axiosClient } from './axiosClient'

export const activityService = {
  async fetchDailyActivity(days: number): Promise<InstagramActivityPayload> {
    const { data } = await axiosClient.get<InstagramActivityPayload>(
      '/api/v1/analytics/instagram/daily-activity',
      { params: { days } },
    )
    return data
  },
}

