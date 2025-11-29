export type RangeOption = 'Day' | 'Week' | 'Month' | 'Year'

export interface SentimentCounts {
  positive: number
  neutral: number
  negative: number
}

export interface TrendPoint {
  bucket: string
  positive: number
  neutral: number
  negative: number
}

export interface SourceBreakdown {
  sourceType: string
  total: number
  positive: number
  neutral: number
  negative: number
  avg_score?: number | null
}

export interface EmotionShare {
  emotion: string
  total: number
}

export interface SentimentSample {
  id: string
  sourceId: string
  sourceType: string
  sentiment: string
  sentimentScore?: number
  topEmotion?: string | null
  analyzedText?: string | null
  createdAt: string
}

export interface AnalyticsPayload {
  counts: SentimentCounts
  trend: TrendPoint[]
  sources: SourceBreakdown[]
  emotions: EmotionShare[]
  samples: SentimentSample[]
}