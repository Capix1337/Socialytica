import { UsersRound, FileText, CheckCircle, UserPlus } from "lucide-react"
import { Section } from "./Section"
import { StatCard } from "./StatCard"

export function OverviewStats() {
  return (
    <Section title="Overview" description="Key metrics for your platform">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="0"
          icon={<UsersRound className="h-4 w-4 text-blue-600" />}
          description="Active users on platform"
        />
        <StatCard
          title="Total Tests"
          value="0"
          icon={<FileText className="h-4 w-4 text-green-600" />}
          description="Created tests"
        />
        <StatCard
          title="Test Attempts"
          value="0"
          icon={<CheckCircle className="h-4 w-4 text-yellow-600" />}
          description="Total test completions"
        />
        <StatCard
          title="New Users"
          value="0"
          icon={<UserPlus className="h-4 w-4 text-purple-600" />}
          description="Registrations this month"
        />
      </div>
    </Section>
  )
}