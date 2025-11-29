import type { SentimentCounts } from '../../features/analytics/types'

const defaultMapDots = [
  { id: 1, top: 28, left: 26, color: '#38bdf8' },
  { id: 2, top: 32, left: 53, color: '#fb7185' },
  { id: 3, top: 54, left: 71, color: '#22d3ee' },
  { id: 4, top: 64, left: 35, color: '#a855f7' },
  { id: 5, top: 42, left: 15, color: '#f4a259' },
]

interface MapTrendSectionProps {
  counts: SentimentCounts
  rangeLabel: string
  trendLabel: string
  sparklinePoints: string
  axisLabels: string[]
  totalMentions: number
}

export const MapTrendSection = ({
  counts,
  rangeLabel,
  sparklinePoints,
  axisLabels,
  totalMentions,
  trendLabel,
}: MapTrendSectionProps) => (
  <div className="map-trend-grid">
    <div className="surface map-card">
      <div className="card-heading-row">
        <div>
          <p className="card-label">Global pulse</p>
          <p className="card-value">{totalMentions.toLocaleString()} interactions</p>
        </div>
        <span className="card-helper">{rangeLabel} window</span>
      </div>
      <div className="world-map">
        {defaultMapDots.map((dot) => (
          <span
            key={dot.id}
            className="map-dot"
            style={{ top: `${dot.top}%`, left: `${dot.left}%`, background: dot.color }}
          />
        ))}
      </div>
      <div className="sentiment-pills">
        <span className="pill positive">{counts.positive} positive</span>
        <span className="pill neutral">{counts.neutral} neutral</span>
        <span className="pill negative">{counts.negative} negative</span>
      </div>
    </div>

    <div className="surface trend-card">
      <p className="card-label">Comment volume</p>
      <p className="trend-value">{trendLabel}</p>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="spark-chart">
        <polyline points={sparklinePoints} />
      </svg>
      <div className="trend-axis">
        {axisLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  </div>
)