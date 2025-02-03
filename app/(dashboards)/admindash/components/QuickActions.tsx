"use client"

import { Section } from "./Section"
import { useActionHandlers } from "@/hooks/admin/useActionHandlers"
import { Button } from "@/components/ui/button"
import { Plus, Users, FileText, BarChart } from "lucide-react"

export function QuickActions() {
  const {
    handleCreateTest,
    handleViewUsers,
    handleManageTests,
    handleViewAnalytics,
    isLoading
  } = useActionHandlers()

  return (
    <Section title="Quick Actions" description="Common management tasks">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button
          onClick={handleCreateTest}
          disabled={isLoading}
          className="w-full justify-start"
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Test
        </Button>
        
        <Button
          onClick={handleViewUsers}
          className="w-full justify-start"
          variant="outline"
        >
          <Users className="mr-2 h-4 w-4" />
          View Users
        </Button>

        <Button
          onClick={handleManageTests}
          className="w-full justify-start"
          variant="outline"
        >
          <FileText className="mr-2 h-4 w-4" />
          Manage Tests
        </Button>

        <Button
          onClick={handleViewAnalytics}
          className="w-full justify-start"
          variant="outline"
        >
          <BarChart className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>
    </Section>
  )
}