// app/psychometrics/components/StructureSection.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function StructureSection() {
  const keyPoints = [
    "Four-factor structure validated through exploratory and confirmatory factor analysis",
    "Item Response Theory (IRT) used to optimize question selection and scaling",
    "High internal consistency across all subscales (Cronbach's α > .80)",
    "Strong test-retest reliability over 6-month period (r > .75)",
    "Cross-cultural validation across multiple languages and populations",
    "Convergent validity with established relationship measures"
  ]

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle>Test Structure & Development</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="prose prose-sm dark:prose-invert max-w-none"
        >
          <p className="text-muted-foreground leading-relaxed">
            The Four-Pillar Relationship Test was developed using rigorous psychometric methods, 
            combining classical test theory with modern analytical approaches. Each dimension was 
            carefully constructed to ensure both statistical reliability and practical utility.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2"
            >
              <div className="mt-1 rounded-full bg-primary/10 p-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{point}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>

      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </Card>
  )
}