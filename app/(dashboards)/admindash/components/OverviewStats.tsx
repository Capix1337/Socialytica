import { UsersRound, FileText, CheckCircle, UserPlus } from "lucide-react"
import { Section } from "./Section"
import { StatCard } from "./StatCard"
import { Skeleton } from "@/components/ui/skeleton"

interface OverviewStatsProps {
  data?: {
    totalUsers: number
    totalTests: number
    totalAttempts: number
    recentRegistrations: number
    averageScore: number
  }
  isLoading: boolean
}

export function OverviewStats({ data, isLoading }: OverviewStatsProps) {
  if (isLoading) {
    return (
      <Section title="Overview" description="Key metrics for your platform">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-6 rounded-lg border bg-card">
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-8 w-[60px] mb-1" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
          ))}
        </div>
      </Section>
    )
  }

  return (
    <Section title="Overview" description="Key metrics for your platform">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={data?.totalUsers ?? 0}
          icon={<UsersRound className="h-4 w-4 text-blue-600" />}
          description="Active users on platform"
        />
        <StatCard
          title="Total Tests"
          value={data?.totalTests ?? 0}
          icon={<FileText className="h-4 w-4 text-green-600" />}
          description="Created tests"
        />
        <StatCard
          title="Test Attempts"
          value={data?.totalAttempts ?? 0}
          icon={<CheckCircle className="h-4 w-4 text-yellow-600" />}
          description="Total test completions"
        />
        <StatCard
          title="New Users"
          value={data?.recentRegistrations ?? 0}
          icon={<UserPlus className="h-4 w-4 text-purple-600" />}
          description="Registrations this month"
        />
      </div>
    </Section>
  )
}