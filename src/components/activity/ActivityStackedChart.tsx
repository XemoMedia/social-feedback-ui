import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ActivityTypePoint } from '../../features/activity/types'

interface ActivityStackedChartProps {
  stackedSeries: ActivityTypePoint[]
}

const COLORS: Record<ActivityTypePoint['activityType'], string> = {
  post: '#2563eb',
  comment: '#7c3aed',
  reply: '#f97316',
}

const formatLabel = (value: string) =>
  new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

export const ActivityStackedChart = ({ stackedSeries }: ActivityStackedChartProps) => {
  if (!stackedSeries.length) {
    return (
      <section className="surface activity-card">
        <p className="card-label">Stacked volume</p>
        <p className="card-value">No activity recorded</p>
      </section>
    )
  }

  const grouped = stackedSeries.reduce<Record<string, { date: string; post: number; comment: number; reply: number }>>(
    (acc, point) => {
      if (!acc[point.activityDate]) {
        acc[point.activityDate] = {
          date: formatLabel(point.activityDate),
          post: 0,
          comment: 0,
          reply: 0,
        }
      }
      acc[point.activityDate][point.activityType] = point.totalCount
      return acc
    },
    {},
  )

  const chartData = Object.values(grouped)

  return (
    <section className="surface activity-card">
      <div className="card-heading-row">
        <div>
          <p className="card-label">Stacked volume</p>
          <p className="card-value">Daily contribution by activity type</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} stackOffset="expand">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} />
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
          <Area type="monotone" dataKey="post" stackId="1" stroke={COLORS.post} fill={COLORS.post} />
          <Area
            type="monotone"
            dataKey="comment"
            stackId="1"
            stroke={COLORS.comment}
            fill={COLORS.comment}
          />
          <Area type="monotone" dataKey="reply" stackId="1" stroke={COLORS.reply} fill={COLORS.reply} />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  )
}

