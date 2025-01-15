// @/app/our-framework/components/ui/info-card.tsx
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface InfoCardProps {
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  title: string
  description: string
  children?: React.ReactNode
}

export function InfoCard({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  description,
  children
}: InfoCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-4">
        <div className={`p-3 rounded-full w-fit ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        {children && <div className="pt-4">{children}</div>}
      </CardContent>
    </Card>
  )
}