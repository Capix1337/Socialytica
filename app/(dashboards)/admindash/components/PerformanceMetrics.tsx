import { Section } from "./Section"

export function PerformanceMetrics() {
  return (
    <Section title="Performance Metrics" description="Key performance indicators">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Test Completion Rates</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Chart coming soon
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold mb-2">User Engagement</h3>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Chart coming soon
          </div>
        </div>
      </div>
    </Section>
  )
}