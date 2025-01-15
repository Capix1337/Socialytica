// app/psychometrics/components/ApplicationsSection.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Activity, BookOpen } from "lucide-react"

const applications = [
  {
    title: "Focused Interventions",
    description: [
      "Target specific areas where couples show discrepancies",
      "Develop tailored communication techniques",
      "Address specific accountability needs"
    ],
    icon: Brain
  },
  {
    title: "Progress Monitoring",
    description: [
      "Regular 3-6 month reassessments",
      "Quantifiable feedback on therapy effectiveness",
      "Track improvements in key relationship areas"
    ],
    icon: Activity
  },
  {
    title: "Academic Research",
    description: [
      "Study correlations between relationship dimensions",
      "Analyze moderating factors under stress",
      "Longitudinal relationship development studies"
    ],
    icon: BookOpen
  }
]

export function ApplicationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical and Research Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative space-y-4 p-6 rounded-lg bg-muted/50"
            >
              <app.icon className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">{app.title}</h3>
              <ul className="space-y-2">
                {app.description.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}