import type { SourceBreakdown } from '../../features/analytics/types'

interface SourceBreakdownCardProps {
  sources: SourceBreakdown[]
}

export const NewCommentsCard = ({ sources }: SourceBreakdownCardProps) => {
  if (!sources.length) {
    return (
      <section className="surface new-comments-card">
        <p className="card-label">Channel breakdown</p>
        <p className="card-value">No data yet</p>
      </section>
    )
  }

  const maxValue = Math.max(...sources.map((item) => item.total), 1)

  return (
    <section className="surface new-comments-card">
      <p className="card-label">Channel breakdown</p>
      <div className="bar-list">
        {sources.map((source) => (
          <div key={source.sourceType} className="bar-row">
            <span>{source.sourceType}</span>
            <div className="bar">
              <span style={{ width: `${(source.total / maxValue) * 100}%` }} />
            </div>
            <strong>{source.total}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

