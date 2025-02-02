"use client"

import React, { useEffect, useState } from "react"
import { OverviewStats } from "./components/OverviewStats"
import { QuickActions } from "./components/QuickActions"
import { ActivityFeed } from "./components/ActivityFeed"
import { PerformanceMetrics } from "./components/PerformanceMetrics"
import { DashboardLayout } from "./components/DashboardLayout"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState(null)
  const [activityData, setActivityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch both stats and activity data in parallel
        const [statsResponse, activityResponse] = await Promise.all([
          fetch("/api/admin/dashboard/stats"),
          fetch("/api/admin/dashboard/activity")
        ])

        // Handle stats response
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch dashboard stats")
        }
        const stats = await statsResponse.json()

        // Handle activity response
        if (!activityResponse.ok) {
          throw new Error("Failed to fetch activity data")
        }
        const activity = await activityResponse.json()

        setStatsData(stats)
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

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
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
            data={statsData?.performance} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </DashboardLayout>
  )
}