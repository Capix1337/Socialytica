import { useState, useEffect, useCallback } from 'react'
import type { PerformanceMetric } from '@/types/admin/performance'

export function usePerformance(timeframe: 'day' | 'week' | 'month' = 'week') {
  const [performance, setPerformance] = useState<PerformanceMetric | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPerformance = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/performance?timeframe=${timeframe}`)
      if (!response.ok) {
        throw new Error('Failed to fetch performance metrics')
      }
      const data = await response.json()
      setPerformance(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch performance')
      console.error('Error fetching performance:', err)
    } finally {
      setIsLoading(false)
    }
  }, [timeframe])

  useEffect(() => {
    fetchPerformance()
  }, [fetchPerformance])

  return { performance, isLoading, error, refetch: fetchPerformance }
}