// @/app/our-framework/components/pillars/TrustPillar.tsx
import { Brain } from "lucide-react"
import { PillarCard } from "./PillarCard"

const trustPillarData = {
  title: "Trust & Loyalty",
  description: "The foundation of emotional security and relationship stability. This pillar assesses the depth of trust, commitment, and loyalty between partners, recognizing these elements as crucial for long-term relationship success.",
  icon: Brain,
  color: "text-primary",
  bgColor: "bg-primary/10",
  subAreas: [
    {
      title: "Emotional Security",
      description: "Evaluates the level of emotional safety and security within the relationship, including the ability to be vulnerable, express fears, and share deep feelings without fear of judgment or rejection."
    },
    {
      title: "Commitment & Loyalty",
      description: "Assesses the strength of commitment and dedication to the relationship, including fidelity, reliability, and the ability to prioritize the partnership during challenging times."
    },
    {
      title: "Trust Building & Repair",
      description: "Examines how couples build, maintain, and repair trust over time, including transparency in communication, consistency in actions, and the ability to rebuild trust after breaches."
    }
  ]
}

export function TrustPillar() {
  return (
    <div id="trust-loyalty">
      <PillarCard {...trustPillarData} />
    </div>
  )
}