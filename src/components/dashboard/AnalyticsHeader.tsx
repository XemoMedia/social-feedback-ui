import type { RangeOption } from '../../features/analytics/types'

interface AnalyticsHeaderProps {
  title: string
  eyebrow: string
  range: RangeOption
  ranges: RangeOption[]
  onRangeChange: (range: RangeOption) => void
  onBack: () => void
}

export const AnalyticsHeader = ({
  title,
  eyebrow,
  range,
  ranges,
  onRangeChange,
  onBack,
}: AnalyticsHeaderProps) => (
  <header className="analytics-header">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
    </div>

    <div className="range-toggle" role="group" aria-label="Select time range">
      {ranges.map((option) => (
        <button
          key={option}
          type="button"
          className={option === range ? 'active' : ''}
          onClick={() => onRangeChange(option)}
        >
          {option}
        </button>
      ))}
    </div>

    <button type="button" className="secondary-btn" onClick={onBack}>
      Back to login
    </button>
  </header>
)

