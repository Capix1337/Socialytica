import { HelpCircle } from "lucide-react"

export function HelpHeader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
      </div>
      
      <p className="text-muted-foreground text-lg">
        Get assistance with platform administration and management
      </p>
      
      <div className="border-b" />
    </div>
  )
}