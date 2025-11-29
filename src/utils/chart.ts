export const buildSparklinePoints = (series: number[]): string => {
  if (!series.length) return ''
  const max = Math.max(...series)
  const denominator = Math.max(series.length - 1, 1)

  return series
    .map((value, index) => {
      const x = (index / denominator) * 100
      const normalized = max === 0 ? 0 : value / max
      const y = 100 - normalized * 90
      return `${x},${y}`
    })
    .join(' ')
}

interface DonutSlice {
  value: number
  color: string
}

export const buildDonutStops = (slices: DonutSlice[]): string => {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1

  let current = 0
  return slices
    .map((slice) => {
      const start = (current / total) * 100
      current += slice.value
      const end = (current / total) * 100
      return `${slice.color} ${start}% ${end}%`
    })
    .join(', ')
}

