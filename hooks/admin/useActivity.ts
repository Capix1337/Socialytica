import { useState, useEffect, useCallback } from 'react'
import type { ActivityFeedData, ActivityResponse } from '@/types/admin/activity'

export function useActivity(page = 1, limit = 10) {
  const [activities, setActivities] = useState<ActivityFeedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivity = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/activity?page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error('Failed to fetch activity feed')
      }
      const data: ActivityResponse = await response.json()
      if (data.success && data.data) {
        setActivities(data.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activity')
      console.error('Error fetching activity:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    fetchActivity()
  }, [fetchActivity])

  return { activities, isLoading, error, refetch: fetchActivity }
}