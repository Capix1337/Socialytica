// @/app/our-framework/components/theory-section.tsx
"use client"

import { motion } from "framer-motion"
import { Brain, Heart, GitMerge } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const theories = [
  {
    title: "Family Systems Theory",
    description: "Highlights the interdependence of individuals within a relational system. Dysfunction in one area can ripple across the entire relationship, triggering conflict and dissatisfaction in seemingly unrelated areas.",
    icon: GitMerge,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Attachment Theory",
    description: "Based on work by John Bowlby and Mary Ainsworth, emphasizing trust, emotional security, and reliability in relationships. Examines how deficits in trust impact other relationship pillars.",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    title: "Behavioral-Cognitive Models",
    description: "Explores tangible behaviors and thought patterns influencing relational outcomes, including conflict resolution styles, emotional disclosure, and active listening patterns.",
    icon: Brain,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
]

export function TheorySection() {
  return (
    <section id="theory" className="py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The Theory Behind the Test
          </h2>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-lg">
            Our framework is built on decades of research and insights from leading psychological and sociological theories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {theories.map((theory, index) => (
            <motion.div
              key={theory.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className={`p-3 rounded-full w-fit ${theory.bgColor}`}>
                    <theory.icon className={`w-6 h-6 ${theory.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{theory.title}</h3>
                  <p className="text-muted-foreground">{theory.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}