import { Plus, Users, FileText, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "./Section"

export function QuickActions() {
  return (
    <Section title="Quick Actions" description="Common management tasks">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button className="w-full justify-start" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create New Test
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Users className="mr-2 h-4 w-4" />
          View Users
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Manage Tests
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <BarChart className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>
    </Section>
  )
}