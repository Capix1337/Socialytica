// app/psychometrics/components/ValiditySection.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

const validityTypes = [
  {
    type: "Content Validity",
    description: "Each sub-area was developed with marriage and family therapy experts and checked against theoretical frameworks from family systems, attachment theory, and behavioral couple therapy.",
    score: "High",
    color: "bg-green-500/10 text-green-700 dark:text-green-400"
  },
  {
    type: "Convergent Validity",
    description: "Sub-areas correlate significantly (r ≈ .75–.85) with standardized instruments such as the Index of Sexual Satisfaction or the Dyadic Trust Scale.",
    score: "Strong",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400"
  },
  {
    type: "Predictive Validity",
    description: "Scores below ~4.0 (on a 7-point scale) often predict higher risk of dissatisfaction, conflict escalation, or separation over 6–12 months.",
    score: "Excellent",
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-400"
  }
]

export function ValiditySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Validity Indicators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {validityTypes.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{item.type}</h3>
                <Badge variant="secondary" className={item.color}>
                  {item.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <CheckCircle className="h-5 w-5 text-primary" />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}