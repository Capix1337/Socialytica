// @/app/our-framework/components/traits-section.tsx
"use client"

import { motion } from "framer-motion"
import { User, Users, Heart, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const traits = [
  {
    icon: User,
    title: "Individual Characteristics",
    description: "Personal traits that influence relationship dynamics",
    impacts: [
      "Emotional Intelligence",
      "Communication Style",
      "Attachment Pattern"
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Users,
    title: "Interpersonal Dynamics",
    description: "How individuals interact and relate to each other",
    impacts: [
      "Conflict Resolution",
      "Support Patterns",
      "Boundary Setting"
    ],
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: Heart,
    title: "Emotional Patterns",
    description: "Recurring emotional responses and behaviors",
    impacts: [
      "Expression of Feelings",
      "Emotional Availability",
      "Intimacy Comfort"
    ],
    color: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
  {
    icon: Shield,
    title: "Relationship Skills",
    description: "Learned abilities that enhance relationship quality",
    impacts: [
      "Active Listening",
      "Empathy",
      "Problem Solving"
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  }
]

export function TraitsSection() {
  return (
    <section id="traits" className="py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Personal Traits & Impact
          </h2>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-lg">
            Understanding how individual characteristics influence relationship outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className={`p-3 rounded-full w-fit ${trait.bgColor}`}>
                    <trait.icon className={`w-6 h-6 ${trait.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{trait.title}</h3>
                  <p className="text-muted-foreground">{trait.description}</p>
                  <div className="space-y-2">
                    {trait.impacts.map((impact, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg bg-muted/50 text-sm"
                      >
                        {impact}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}