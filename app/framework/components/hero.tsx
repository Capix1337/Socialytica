// @/app/our-framework/components/hero.tsx
"use client"

import { motion } from "framer-motion"
import { Brain, Heart, Users, Target } from "lucide-react"

export function FrameworkHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              The Four-Pillar Relationship Test Framework
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl">
              A comprehensive approach to understanding and improving relationship dynamics through scientifically-validated methods.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center p-4 space-y-2 rounded-xl bg-card border group hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-sm">{pillar.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const pillars = [
  {
    title: "Common Values & Goals",
    icon: Target,
  },
  {
    title: "Sexuality",
    icon: Heart,
  },
  {
    title: "Communication",
    icon: Users,
  },
  {
    title: "Trust & Loyalty",
    icon: Brain,
  },
]