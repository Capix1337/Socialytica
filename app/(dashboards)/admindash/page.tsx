import React from 'react';
import { OverviewStats } from "./components/OverviewStats"
import { QuickActions } from "./components/QuickActions"
import { ActivityFeed } from "./components/ActivityFeed"
import { PerformanceMetrics } from "./components/PerformanceMetrics"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <OverviewStats />
      <QuickActions />
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityFeed />
        <PerformanceMetrics />
      </div>
    </div>
  )
}