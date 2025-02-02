import { useState, useEffect } from 'react'
import type { AdminDashboardStats, StatsResponse } from '@/types/admin/stats'

export function useStats() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats')
      }
      const data: StatsResponse = await response.json()
      if (data.success && data.data) {
        setStats(data.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
      console.error('Error fetching admin stats:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, isLoading, error, refetch: fetchStats }
}