// app/psychometrics/components/PillarCard.tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SubArea {
  name: string
  items: string
  reliability: string
  testRetest: string
  description: string
}

interface PillarCardProps {
  pillar: {
    title: string
    subAreas: SubArea[]
  }
}

export function PillarCard({ pillar }: PillarCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 dark:bg-primary/10">
        <CardTitle className="text-xl font-semibold">{pillar.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {pillar.subAreas.map((subArea, index) => (
            <motion.div
              key={subArea.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 hover:bg-muted/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <h4 className="font-medium">{subArea.name}</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    {subArea.items} items
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm">
                    <div className="font-medium">Reliability</div>
                    <div className="text-muted-foreground">{subArea.reliability}</div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm">
                    <div className="font-medium">Test-Retest</div>
                    <div className="text-muted-foreground">{subArea.testRetest}</div>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <p className="text-sm text-muted-foreground">{subArea.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}