"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { OverviewStats } from "./components/OverviewStats"
import { QuickActions } from "./components/QuickActions"
import { ActivityFeed } from "./components/ActivityFeed"
import { PerformanceMetrics } from "./components/PerformanceMetrics"
import { DashboardLayout } from "./components/DashboardLayout"
import { StatsLoadingSkeleton, ActivityLoadingSkeleton } from "./components/LoadingStates"
import { ErrorState } from "./components/ErrorStates"
import { fadeIn, slideIn, staggerChildren } from "./components/transitions"

interface TestCompletion {
  id: string
  userId: string
  testId: string
  completedAt: string
  score: number
  user: {
    firstName: string
    lastName: string
    email: string
  }
  test: {
    title: string
  }
}

interface NewUser {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

interface NewTest {
  id: string
  title: string
  isPublished: boolean
  createdAt: string
  user: {
    firstName: string
    lastName: string
  }
}

interface ActivityData {
  testCompletions: TestCompletion[]
  newUsers: NewUser[]
  newTests: NewTest[]
}

interface StatsData {
  overview: {
    totalUsers: number
    totalTests: number
    totalAttempts: number
    recentRegistrations: number
    averageScore: number
  }
  lastUpdated: string
}

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState<StatsData | null>(null)
  const [activityData, setActivityData] = useState<ActivityData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Move fetchDashboardData outside useEffect
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [statsResponse, activityResponse] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/activity")
      ])

      if (!statsResponse.ok) {
        throw new Error("Failed to fetch dashboard stats")
      }
      const stats = (await statsResponse.json()) as StatsData
      setStatsData(stats)

      if (!activityResponse.ok) {
        throw new Error("Failed to fetch activity data")
      }
      const activity = (await activityResponse.json()) as ActivityData 
      setActivityData(activity)

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Dashboard data fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Use fetchDashboardData in useEffect
  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (error) {
    return (
      <DashboardLayout>
        <ErrorState
          title="Dashboard Error"
          message={error}
          onRetry={fetchDashboardData} // Now this will work
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        <motion.div 
          className="space-y-6"
          {...staggerChildren}
        >
          <motion.div {...fadeIn}>
            {isLoading ? (
              <StatsLoadingSkeleton />
            ) : (
              <OverviewStats 
                data={statsData?.overview} 
                isLoading={isLoading} 
              />
            )}
          </motion.div>

          <motion.div {...slideIn}>
            <QuickActions />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div {...fadeIn}>
              {isLoading ? (
                <ActivityLoadingSkeleton />
              ) : (
                <ActivityFeed 
                  data={activityData} 
                  isLoading={isLoading}
                />
              )}
            </motion.div>

            <motion.div {...fadeIn}>
              <PerformanceMetrics 
                data={statsData?.overview}
                isLoading={isLoading}
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  )
}