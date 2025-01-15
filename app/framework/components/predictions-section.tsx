// @/app/our-framework/components/predictions-section.tsx
"use client"

import { motion } from "framer-motion"
import { AlertTriangle, LineChart, Lightbulb, ArrowRight } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfoCard } from "./ui/info-card"
import { SectionHeader } from "./ui/section-header"

export function PredictionsSection() {
  return (
    <section id="predictions" className="py-24">
      <div className="container px-4 md:px-6">
        <SectionHeader
          title="Predictive Analytics"
          description="Advanced analysis that helps identify potential outcomes and provides actionable insights for relationship improvement."
        />

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Outcome Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <InfoCard
              icon={LineChart}
              iconColor="text-blue-500"
              iconBgColor="bg-blue-500/10"
              title="Outcome Predictions"
              description="Statistical forecasting of relationship trajectories based on current patterns."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-card border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Stability Score</span>
                    <Badge variant="secondary">85%</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Projected improvement with intervention: +15%
                </div>
              </div>
            </InfoCard>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InfoCard
              icon={AlertTriangle}
              iconColor="text-amber-500"
              iconBgColor="bg-amber-500/10"
              title="Risk Assessment"
              description="Identification of potential challenges and areas requiring attention."
            >
              <div className="space-y-3">
                {['Communication Breakdown', 'Trust Issues', 'Goal Misalignment'].map((risk, index) => (
                  <div key={risk} className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-amber-500' : 'bg-green-500'}`} />
                    <span className="text-sm">{risk}</span>
                  </div>
                ))}
              </div>
            </InfoCard>
          </motion.div>

          {/* Intervention Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoCard
              icon={Lightbulb}
              iconColor="text-yellow-500"
              iconBgColor="bg-yellow-500/10"
              title="Intervention Suggestions"
              description="Personalized recommendations for improving relationship dynamics."
            >
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-card border">
                  <h4 className="font-medium mb-2">Priority Actions</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Schedule weekly check-ins
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Practice active listening
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Set shared goals
                    </li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full">
                  View Detailed Plan
                </Button>
              </div>
            </InfoCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}