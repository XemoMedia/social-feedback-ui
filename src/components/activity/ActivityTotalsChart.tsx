import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { DailyActivityTotals } from '../../features/activity/types'

interface ActivityTotalsChartProps {
  totals: DailyActivityTotals[]
}

const formatLabel = (value: string) =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

export const ActivityTotalsChart = ({ totals }: ActivityTotalsChartProps) => {
  if (!totals.length) {
    return (
      <section className="surface activity-card">
        <p className="card-label">Daily activity</p>
        <p className="card-value">No data yet</p>
      </section>
    )
  }

  const data = totals.map((item) => ({
    date: formatLabel(item.activityDate),
    posts: item.postCount,
    comments: item.commentCount,
    replies: item.replyCount,
  }))

  return (
    <section className="surface activity-card">
      <div className="card-heading-row">
        <div>
          <p className="card-label">Daily activity</p>
          <p className="card-value">Posts vs comments vs replies</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="posts" stackId="activity" fill="#2563eb" />
          <Bar dataKey="comments" stackId="activity" fill="#7c3aed" />
          <Bar dataKey="replies" stackId="activity" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

