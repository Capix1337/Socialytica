import { Section } from "./Section"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PerformanceMetricsProps {
  data?: {
    totalUsers: number
    totalTests: number
    totalAttempts: number
    recentRegistrations: number
    averageScore: number
  }
  isLoading: boolean
}

export function PerformanceMetrics({ data, isLoading }: PerformanceMetricsProps) {
  if (isLoading) {
    return (
      <Section title="Performance Metrics" description="Key performance indicators">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <Skeleton className="h-4 w-[140px] mb-4" />
            <div className="h-[200px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          </Card>
          <Card className="p-4">
            <Skeleton className="h-4 w-[140px] mb-4" />
            <div className="h-[200px] flex items-center justify-center">
              <Skeleton className="h-full w-full" />
            </div>
          </Card>
        </div>
      </Section>
    )
  }

  return (
    <Section title="Performance Metrics" description="Key performance indicators">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Test Completion Rate</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {data ? (
              <div className="text-center">
                <p className="text-2xl font-bold">{data.totalAttempts}</p>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
                <p className="mt-2">
                  Average Score: {data.averageScore.toFixed(1)}%
                </p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-4">User Engagement</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {data ? (
              <div className="text-center">
                <p className="text-2xl font-bold">{data.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="mt-2">
                  New Users: +{data.recentRegistrations} this month
                </p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </Card>
      </div>
    </Section>
  )
}