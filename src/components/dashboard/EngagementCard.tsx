interface EngagementSlice {
  label: string
  value: number
  color: string
}

interface EngagementCardProps {
  slices: EngagementSlice[]
  donutStops: string
}

export const EngagementCard = ({ slices, donutStops }: EngagementCardProps) => (
  <section className="surface engagement-card">
    <p className="card-label">Engagement mix</p>
    <div className="engagement-content">
      <div className="donut" style={{ background: `conic-gradient(${donutStops})` }}>
        <span />
      </div>
      <ul>
        {slices.map((slice) => (
          <li key={slice.label}>
            <span style={{ background: slice.color }} />
            <span>{slice.label}</span>
            <strong>{slice.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  </section>
)