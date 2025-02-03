"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Section } from "./Section"

export function StatsLoadingSkeleton() {
  return (
    <Section title="Overview" description="Loading statistics...">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[60px]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export function ActivityLoadingSkeleton() {
  return (
    <Section title="Recent Activity" description="Loading activities...">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[160px]" />
              </div>
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}