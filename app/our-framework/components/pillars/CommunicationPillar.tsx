// @/app/our-framework/components/pillars/CommunicationPillar.tsx
import { Users } from "lucide-react"
import { PillarCard } from "./PillarCard"

const communicationPillarData = {
  title: "Communication & Conversation Culture",
  description: "Effective communication is the lifeblood of any successful relationship. This pillar evaluates how couples navigate conflicts, express emotions, and engage in proactive maintenance of their partnership.",
  icon: Users,
  color: "text-primary",
  bgColor: "bg-primary/10",
  subAreas: [
    {
      title: "Conflict Resolution Skills",
      description: "Inspired by John Gottman's research, this sub-area examines how couples handle disagreements. It assesses whether they use constructive approaches like calm dialogue and repair attempts or fall into destructive patterns like criticism, contempt, and defensiveness."
    },
    {
      title: "Emotional Disclosure & Listening",
      description: "Open and empathetic communication fosters trust and intimacy. This sub-area evaluates whether partners feel safe sharing their vulnerabilities and whether they actively listen to and validate each other's emotions."
    },
    {
      title: "Regular Check-Ins & Maintenance",
      description: "Proactive communication, such as scheduling regular discussions about relationship goals and concerns, helps prevent small issues from escalating into major conflicts. This sub-area assesses a couple's ability to maintain relational health through intentional dialogue."
    }
  ]
}

export function CommunicationPillar() {
  return (
    <div id="communication">
      <PillarCard {...communicationPillarData} />
    </div>
  )
}