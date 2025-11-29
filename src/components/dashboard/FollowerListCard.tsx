interface FollowerListItem {
  id: string
  name: string
  subline: string
  value: string
  size?: 'small' | 'large'
}

interface FollowerListCardProps {
  title: string
  items: FollowerListItem[]
}

export const FollowerListCard = ({ title, items }: FollowerListCardProps) => (
  <section className="surface list-card">
    <p className="card-label">{title}</p>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div className={`avatar ${item.size ?? 'large'}`}>{item.name.charAt(0)}</div>
          <div>
            <p className="comment-name">{item.name}</p>
            <p className="comment-body">{item.subline}</p>
          </div>
          <strong>{item.value}</strong>
        </li>
      ))}
    </ul>
  </section>
)

