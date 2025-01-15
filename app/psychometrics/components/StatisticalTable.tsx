// app/psychometrics/components/StatisticalTable.tsx
"use client"

import { motion } from "framer-motion"
import { PillarCard } from "./PillarCard"

const pillarData = [
  {
    title: "Common Values, Goals, & Dreams",
    subAreas: [
      {
        name: "Shared Future Plans",
        items: "8-10",
        reliability: ".82 - .87",
        testRetest: ".76 - .80",
        description: "Assesses mutual clarity on life ambitions, including career, finances, family planning. Strong alignment correlates with reduced conflict over big decisions."
      },
      {
        name: "Life Philosophy Congruence",
        items: "8-10",
        reliability: ".80 - .88",
        testRetest: ".74 - .82",
        description: "Examines the degree to which partners share or respect each other's moral/spiritual worldviews."
      },
      // Add other sub-areas...
    ]
  },
  // Add other pillars...
]

export function StatisticalTable() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {pillarData.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PillarCard pillar={pillar} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}