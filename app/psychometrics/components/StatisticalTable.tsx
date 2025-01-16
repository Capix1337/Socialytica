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
      {
        name: "Individual Goal Support",
        items: "6-8",
        reliability: ".78 – .85",
        testRetest: ".72 – .80",
        description: "Evaluates willingness to encourage each other’s personal ambitions (e.g., career transitions, creative endeavors). High subscale scores predict stronger relationship satisfaction and reduced rivalry."
      },
    ]
  },
  {
    title: "Sexuality",
    subAreas: [
      {
        name: "Frequency & Desire Alignment",
        items: "7–9",
        reliability: ".85 – .90",
        testRetest: ".78 – .84",
        description: "Focuses on the match between partners’ sexual desire levels, frequency preferences, and sense of sexual timing. Misalignment may lead to conflict unless well-communicated."
      },
      {
        name: "Intimacy & Emotional Connection",
        items: "8–10",
        reliability: ".86 – .92",
        testRetest: ".80 – .85",
        description: "Emphasizes the emotional bond in sexual activity. Scores relate to greater attachment security and heightened marital stability, reflecting how sexual intimacy can reinforce emotional closeness."
      },
      {
        name: "Communication About Sexual Needs",
        items: "6-8",
        reliability: ".84 – .90",
        testRetest: ".78 – .82",
        description: "Measures candidness in discussing sexual preferences, concerns, and fantasies. Deficits often predict avoidant patterns or unaddressed dissatisfaction, while openness fosters both sexual satisfaction and overall closeness."
      },
    ]
  },
  {
    title: "Communication & Conversation Culture",
    subAreas: [
      {
        name: "Conflict Resolution Skills",
        items: "8–10",
        reliability: ".88 – .92",
        testRetest: ".78 – .84",
        description: "Captures constructive vs. destructive argumentation, including avoidance of criticism, contempt, defensiveness, stonewalling. Strong subscale scores strongly correlate with long-term stability and reduced marital distress."
      },
      {
        name: "Emotional Disclosure & Listening",
        items: "6–8",
        reliability: ".85 – .91",
        testRetest: ".77 – .83",
        description: "Reflects capacity for empathic listening, validating the partner’s experience, and sharing vulnerabilities. Positively linked to conflict de-escalation and deep relational trust."
      },
      {
        name: "Regular Check-Ins & Maintenance",
        items: "6-8",
        reliability: ".82 – .88",
        testRetest: ".75 – .80",
        description: "Assesses proactive discussions about relationship health, from day-to-day emotional “temperature checks” to broader reflection. Often linked to greater relational satisfaction and fewer “unseen” resentments."
      },
    ]
  },
  {
    title: "Trust & Loyalty",
    subAreas: [
      {
        name: "Boundaries & Respect",
        items: "6–8",
        reliability: ".80 – .86",
        testRetest: ".74 – .80",
        description: "Focuses on respecting personal space, privacy, and social boundaries (e.g., with friends, opposite sex colleagues). Low scores may indicate jealousy, excessive control, or chronic suspicion that undermines overall security."
      },
      {
        name: "Reliability & Fidelity",
        items: "8–10",
        reliability: ".85 – .89",
        testRetest: ".78 – .82",
        description: "Evaluates consistency in honoring commitments - both small (day-to-day reliability) and large (shared agreements on fidelity). High scores reflect a stable sense of partner dependability, crucial for long-range relational health."
      },
      {
        name: "Emotional Security & Transparency",
        items: "6-8",
        reliability: ".84 – .88",
        testRetest: ".75 – .80",
        description: "Assesses confidence that private thoughts or doubts can be shared safely. Elevated scores indicate supportive, honest communication, reducing the risk of secret-keeping or emotional distancing."
      },
    ]
  },
  {
    title: "Composite FPRT Score",
    subAreas: [
      {
        name: "Overall Relationship Health Index",
        items: "120",
        reliability: "~ .95 (composite)",
        testRetest: "~ .82 (composite)",
        description: "Aggregates all pillars/sub-areas into a single metric of relationship functioning. Strong composite scores typically predict fewer breakups, lower conflict rates, and higher couple stability over follow-ups."
      },
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