// @/app/our-framework/components/synergy-section.tsx
"use client"

import { motion } from "framer-motion"
import { LineChart, AlertTriangle, Scale } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SynergySection() {
  return (
    <section id="synergy" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Synergy & Thresholds
          </h2>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-lg">
            Understanding how different aspects of your relationship interact and influence each other.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Threshold System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full w-fit bg-blue-500/10">
                  <Scale className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Threshold System</h3>
                <p className="text-muted-foreground">
                  Critical levels that indicate relationship health and stability.
                </p>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Optimal</span>
                      <span>80-100%</span>
                    </div>
                    <Progress value={90} className="h-2 bg-green-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Warning</span>
                      <span>40-79%</span>
                    </div>
                    <Progress value={60} className="h-2 bg-yellow-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Critical</span>
                      <span>0-39%</span>
                    </div>
                    <Progress value={30} className="h-2 bg-red-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Penalty Calculations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full w-fit bg-red-500/10">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold">Impact Assessment</h3>
                <p className="text-muted-foreground">
                  How deficits in one area affect others through penalty multipliers.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-card border">
                    <p className="text-sm font-medium">Trust Deficit</p>
                    <p className="text-sm text-muted-foreground">-20% Communication</p>
                  </div>
                  <div className="p-3 rounded-lg bg-card border">
                    <p className="text-sm font-medium">Communication Issues</p>
                    <p className="text-sm text-muted-foreground">-15% Goal Alignment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full w-fit bg-green-500/10">
                  <LineChart className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Synergy Effects</h3>
                <p className="text-muted-foreground">
                  Positive reinforcement between different relationship aspects.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-card border">
                    <p className="text-sm font-medium">Strong Communication</p>
                    <p className="text-sm text-muted-foreground">+25% Trust Building</p>
                  </div>
                  <div className="p-3 rounded-lg bg-card border">
                    <p className="text-sm font-medium">Shared Goals</p>
                    <p className="text-sm text-muted-foreground">+20% Overall Stability</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}