// @/app/our-framework/components/pillars/SexualityPillar.tsx
import { Heart } from "lucide-react"
import { PillarCard } from "./PillarCard"

const sexualityPillarData = {
  title: "Sexuality",
  description: "Sexual satisfaction and intimacy are crucial components of a healthy relationship. This pillar evaluates both the emotional and physical aspects of a couple's sexual connection, recognizing that dissatisfaction in this domain often spills over into other areas.",
  icon: Heart,
  color: "text-primary",
  bgColor: "bg-primary/10",
  subAreas: [
    {
      title: "Frequency & Desire Alignment",
      description: "Mismatched libidos or unmet expectations around sexual frequency can lead to frustration and feelings of rejection. This sub-area assesses how well partners align in their desires and whether they can negotiate compromises."
    },
    {
      title: "Intimacy & Emotional Connection",
      description: "Beyond physical acts, this sub-area explores the emotional depth of sexual encounters. A strong connection fosters trust, vulnerability, and closeness, while a lack of intimacy can make the relationship feel transactional or disconnected."
    },
    {
      title: "Communication About Sexual Needs",
      description: "Open dialogue about preferences, boundaries, and fantasies is essential for maintaining a fulfilling sexual relationship. Couples who struggle to communicate in this area often experience unresolved tensions that erode trust and satisfaction."
    }
  ]
}

export function SexualityPillar() {
  return (
    <div id="sexuality">
      <PillarCard {...sexualityPillarData} />
    </div>
  )
}