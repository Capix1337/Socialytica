// app/psychometrics/components/PsychometricsHeader.tsx
"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export function PsychometricsHeader() {
  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Four-Pillar Relationship Test
              </h1>
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Structure and Psychometrics: A comprehensive analysis of relationship dynamics through scientifically validated metrics
            </p>
          </motion.div>
        </div>

        {/* Decorative blob shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-0 w-96 h-96 opacity-10 dark:opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rounded-full blur-3xl" />
          </div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 opacity-10 dark:opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}