"use client"

import { useEffect, useState } from "react"
import { OverviewStats } from "./components/OverviewStats"
import { QuickActions } from "./components/QuickActions"
import { ActivityFeed } from "./components/ActivityFeed"
import { PerformanceMetrics } from "./components/PerformanceMetrics"
import { DashboardLayout } from "./components/DashboardLayout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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

  useEffect(() => {
    async function fetchDashboardData() {
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

    fetchDashboardData()
  }, [])

  return (
    <DashboardLayout>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          <OverviewStats 
            data={statsData?.overview} 
            isLoading={isLoading} 
          />
          <QuickActions />
          <div className="grid gap-6 md:grid-cols-2">
            <ActivityFeed 
              data={activityData} 
              isLoading={isLoading} 
            />
            <PerformanceMetrics 
              data={statsData?.overview} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}