// @/app/our-framework/components/pillars/ValuesGoalsPillar.tsx
import { Target } from "lucide-react"
import { PillarCard } from "./PillarCard"

const valuesGoalsData = {
  title: "Common Values, Goals, & Dreams",
  description: "This pillar examines how well partners align on foundational life philosophies, future plans, and individual ambitions. Shared values and goals form the bedrock of long-term relational stability.",
  icon: Target,
  color: "text-primary",
  bgColor: "bg-primary/10",
  subAreas: [
    {
      title: "Shared Future Plans",
      description: "Couples are evaluated on their ability to align on long-term objectives, such as marriage, parenthood, career aspirations, and lifestyle choices. Discrepancies in these areas can lead to chronic tension and unmet expectations if left unresolved."
    },
    {
      title: "Life Philosophy Congruence",
      description: "This sub-area addresses deeper existential and moral questions, including religious beliefs, ethical stances, and cultural values. Even minor misalignments in life philosophy can intensify over time."
    },
    {
      title: "Individual Goal Support",
      description: "A healthy relationship requires mutual encouragement and support for each partner's personal ambitions. This sub-area evaluates whether partners champion each other's career goals, creative pursuits, and personal growth."
    }
  ]
}

export function ValuesGoalsPillar() {
  return (
    <div id="values-goals">
      <PillarCard {...valuesGoalsData} />
    </div>
  )
}