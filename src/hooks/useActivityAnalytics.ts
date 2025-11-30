import { useEffect } from 'react'
import { fetchActivityAnalytics, setDays } from '../features/activity/activitySlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useActivityAnalytics = () => {
  const dispatch = useAppDispatch()
  const { days, data, status, error } = useAppSelector((state) => state.activity)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivityAnalytics(days))
    }
  }, [dispatch, days, status])

  const changeDays = (nextDays: number) => {
    dispatch(setDays(nextDays))
    dispatch(fetchActivityAnalytics(nextDays))
  }

  const refresh = () => {
    dispatch(fetchActivityAnalytics(days))
  }

  return {
    days,
    data,
    status,
    error,
    setDays: changeDays,
    refresh,
  }
}

