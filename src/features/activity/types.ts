export interface DailyActivityTotals {
  activityDate: string
  postCount: number
  commentCount: number
  replyCount: number
}

export interface ActivityTypePoint {
  activityDate: string
  activityType: 'post' | 'comment' | 'reply'
  totalCount: number
}

export interface InstagramActivityPayload {
  totals: DailyActivityTotals[]
  stackedSeries: ActivityTypePoint[]
}

