const BrandMark = () => (
  <svg className="brand-icon" viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#49c4f8" />
        <stop offset="45%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ff8c5a" />
      </linearGradient>
    </defs>
    <path
      fill="url(#brandGradient)"
      d="M44.6 7.5 32 26.7 19.4 7.5H7l18.8 28.2L7 56.5h12.4L32 37.3l12.6 19.2H57L38.2 35.7 57 7.5Z"
    />
  </svg>
)

export default BrandMark

