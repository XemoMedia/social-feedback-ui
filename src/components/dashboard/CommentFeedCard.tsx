import type { SentimentSample } from '../../features/analytics/types'

interface CommentFeedCardProps {
  samples: SentimentSample[]
}

const formatTimestamp = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

export const CommentFeedCard = ({ samples }: CommentFeedCardProps) => (
  <section className="surface comments-card">
    <div className="card-heading-row">
      <div>
        <p className="card-label">Comments analytics</p>
        <p className="card-value">Latest analyzed snippets</p>
      </div>
    </div>

    <ul className="comment-feed">
      {samples.map((sample) => (
        <li key={sample.id}>
          <div className={`avatar ${sample.sentiment}`}>
            {(sample.sourceType ?? '?').charAt(0)}
          </div>
          <div>
            <p className="comment-name">
              {sample.sourceType} · {sample.sentiment}
            </p>
            <p className="comment-body">{sample.analyzedText || 'No text provided'}</p>
            <p className="comment-meta">{formatTimestamp(sample.createdAt)}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
)