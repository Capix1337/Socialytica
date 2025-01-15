// @/app/our-framework/components/pillars/PillarCard.tsx
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface PillarCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  subAreas: {
    title: string
    description: string
  }[]
}

export function PillarCard({
  title,
  description,
  icon: Icon,
  color,
  bgColor,
  subAreas,
}: PillarCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-4 p-6">
        <div className={`p-3 rounded-full w-fit ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {subAreas.map((subArea, index) => (
            <motion.div
              key={subArea.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              <h4 className="font-semibold">{subArea.title}</h4>
              <p className="text-sm text-muted-foreground">{subArea.description}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}