import { Section } from "./Section"

export function ActivityFeed() {
  return (
    <Section title="Recent Activity" description="Latest actions and events">
      <div className="space-y-4">
        {/* Placeholder for when we add real data */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">No recent activity</p>
              <p className="text-sm text-muted-foreground">
                Recent activities will appear here
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              -
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}