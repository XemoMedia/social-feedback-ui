import BrandMark from '../common/BrandMark'

export interface Tile {
  id: string
  title: string
  tagline: string
  accent: string
}

interface InfoPanelProps {
  title: string
  subtitle: string
  body: string
  tiles: Tile[]
  checklist: string[]
  ctaLabel: string
  onCta?: () => void
}

export const InfoPanel = ({
  title,
  subtitle,
  body,
  tiles,
  checklist,
  ctaLabel,
  onCta,
}: InfoPanelProps) => (
  <section className="info-panel">
    <div className="info-brand">
      <div className="logo-mark" aria-hidden="true">
        <BrandMark />
      </div>
      <div>
        <p className="info-heading">{title}</p>
        <p className="info-subheading">{subtitle}</p>
      </div>
    </div>

    <p className="info-copy">{body}</p>

    <div className="logo-gallery">
      {tiles.map((tile) => (
        <article key={tile.id} className={`logo-tile ${tile.accent}`}>
          <h3>{tile.title}</h3>
          <p>{tile.tagline}</p>
        </article>
      ))}
    </div>

    <ul className="info-checklist">
      {checklist.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>

    <div className="info-meta">
      Ready for an enterprise pilot?
      <button type="button" className="text-btn dark" onClick={onCta}>
        {ctaLabel}
      </button>
    </div>
  </section>
)

