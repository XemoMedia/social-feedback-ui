import { useEffect } from 'react'
import { fetchAnalytics, setRange } from '../features/analytics/analyticsSlice'
import type { RangeOption } from '../features/analytics/types'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useAnalytics = () => {
  const dispatch = useAppDispatch()
  const { range, data, status, error } = useAppSelector((state) => state.analytics)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAnalytics(range))
    }
  }, [dispatch, range, status])

  const changeRange = (nextRange: RangeOption) => {
    dispatch(setRange(nextRange))
    dispatch(fetchAnalytics(nextRange))
  }

  const refresh = () => {
    dispatch(fetchAnalytics(range))
  }

  return {
    range,
    data,
    status,
    error,
    setRange: changeRange,
    refresh,
  }
}

