import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnalyticsHeader } from '../components/dashboard/AnalyticsHeader'
import { CommentFeedCard } from '../components/dashboard/CommentFeedCard'
import { EngagementCard } from '../components/dashboard/EngagementCard'
import { FollowerListCard } from '../components/dashboard/FollowerListCard'
import { GrowthCard } from '../components/dashboard/GrowthCard'
import { MapTrendSection } from '../components/dashboard/MapTrendSection'
import { NewCommentsCard } from '../components/dashboard/NewCommentsCard'
import { useAnalytics } from '../hooks/useAnalytics'
import type { RangeOption } from '../features/analytics/types'
import { buildDonutStops, buildSparklinePoints } from '../utils/chart'
import '../styles/dashboard.css'

const rangeOptions: RangeOption[] = ['Day', 'Week', 'Month', 'Year']
const emotionPalette = ['#2563eb', '#7c3aed', '#06b6d4', '#22c55e', '#f97316', '#f43f5e']

const DashboardPage = () => {
  const navigate = useNavigate()
  const { data, range, status, setRange, error, refresh } = useAnalytics()

  const trendTotals = useMemo(
    () =>
      data?.trend.map((point) => point.positive + point.neutral + point.negative) ?? [],
    [data?.trend],
  )

  const sparklinePoints = useMemo(() => buildSparklinePoints(trendTotals), [trendTotals])

  const axisLabels = useMemo(
    () =>
      data?.trend.map((point) =>
        new Date(point.bucket).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      ) ?? [],
    [data?.trend],
  )

  const emotionSlices = useMemo(
    () =>
      data?.emotions.map((emotion, index) => ({
        label: emotion.emotion,
        value: emotion.total,
        color: emotionPalette[index % emotionPalette.length],
      })) ?? [],
    [data?.emotions],
  )

  const donutStops = useMemo(() => buildDonutStops(emotionSlices), [emotionSlices])

  const totalMentions =
    (data?.counts.positive ?? 0) + (data?.counts.neutral ?? 0) + (data?.counts.negative ?? 0)
  const trendLabel = trendTotals.length ? `${trendTotals.at(-1)} latest volume` : 'Awaiting data'

  return (
    <div className="analytics-shell">
      <div className="analytics-page">
        <AnalyticsHeader
          title="Comment analytics"
          eyebrow="Command center"
          range={range}
          ranges={rangeOptions}
          onRangeChange={setRange}
          onBack={() => navigate('/')}
        />

        {status === 'loading' && !data ? (
          <p>Loading analytics...</p>
        ) : error ? (
          <div className="error-state">
            <p>Analytics unavailable right now.</p>
            <button type="button" onClick={refresh} className="secondary-btn">
              Retry
            </button>
          </div>
        ) : data ? (
          <div className="analytics-body">
            <div className="analytics-main">
              <MapTrendSection
                counts={data.counts}
                rangeLabel={range}
                trendLabel={trendLabel}
                sparklinePoints={sparklinePoints}
                axisLabels={axisLabels.slice(-4)}
                totalMentions={totalMentions}
              />

              <CommentFeedCard samples={data.samples.slice(0, 5)} />

              <div className="map-trend-grid">
                <NewCommentsCard sources={data.sources} />
                <EngagementCard slices={emotionSlices} donutStops={donutStops} />
              </div>
            </div>

            <div className="analytics-side">
              <FollowerListCard
                title="Channel sentiment"
                items={data.sources.map((source) => ({
                  id: source.sourceType,
                  name: source.sourceType,
                  subline: `${source.positive} positive / ${source.negative} negative`,
                  value: source.total.toString(),
                }))}
              />

              <FollowerListCard
                title="Recent analyses"
                items={data.samples.slice(0, 4).map((sample) => ({
                  id: sample.id,
                  name: sample.sentiment,
                  subline: sample.sourceType,
                  value: sample.sentimentScore?.toFixed(2) ?? '—',
                  size: 'small',
                }))}
              />

              <GrowthCard growthSeries={trendTotals} labels={axisLabels} />
            </div>
          </div>
        ) : (
          <p>Analytics unavailable right now.</p>
        )}
      </div>
    </div>
  )
}

export default DashboardPage

