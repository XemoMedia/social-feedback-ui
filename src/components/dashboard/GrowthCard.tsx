interface GrowthCardProps {
  growthSeries: number[]
  labels: string[]
}

export const GrowthCard = ({ growthSeries, labels }: GrowthCardProps) => {
  const max = Math.max(...growthSeries, 1)

  return (
    <section className="surface growth-card">
      <div className="card-heading-row">
        <div>
          <p className="card-label">Follower growth</p>
          <p className="card-value">+18% vs last month</p>
        </div>
      </div>
      <div className="growth-chart">
        {growthSeries.map((point, index) => (
          <span key={`${point}-${index}`} style={{ height: `${(point / max) * 100}%` }} />
        ))}
      </div>
      <div className="chart-axis">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  )
}

