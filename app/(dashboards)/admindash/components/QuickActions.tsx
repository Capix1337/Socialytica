"use client"

import { Section } from "./Section"
import { CreateTest } from "./actions/CreateTest"
import { ViewUsers } from "./actions/ViewUsers"
import { ManageTests } from "./actions/ManageTests"
import { Button } from "@/components/ui/button"
import { BarChart } from "lucide-react"

export function QuickActions() {
  return (
    <Section title="Quick Actions" description="Common management tasks">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CreateTest />
        <ViewUsers />
        <ManageTests />
        <Button className="w-full justify-start" variant="outline">
          <BarChart className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </div>
    </Section>
  )
}