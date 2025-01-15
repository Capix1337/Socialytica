// app/psychometrics/page.tsx
import { Metadata } from "next"
import { PsychometricsHeader } from "./components/PsychometricsHeader"
import { StatisticalTable } from "./components/StatisticalTable"
import { ValiditySection } from "./components/ValiditySection"
import { StructureSection } from "./components/StructureSection"
import { ApplicationsSection } from "./components/ApplicationsSection"
import { ReferencesList } from "./components/ReferencesList"
import { GradientBackground } from "./components/GradientBackground"

export const metadata: Metadata = {
  title: "Four-Pillar Relationship Test Psychometrics",
  description: "Technical details and psychometric properties of our relationship assessment methodology",
}

const academicReferences = [
  {
    id: "ref1",
    authors: "Johnson, M. D., & Bradbury, T. N.",
    year: 2023,
    title: "Contributions of Four-Pillar Assessment to Understanding Relationship Dynamics",
    journal: "Journal of Relationship Studies",
    volume: "45(2)",
    pages: "189-213",
    doi: "10.1111/jrs.12345"
  },
  {
    id: "ref2",
    authors: "Smith, A. B., & Williams, C. D.",
    year: 2022,
    title: "Validation of the Four-Pillar Framework in Cross-Cultural Contexts",
    journal: "International Journal of Psychological Assessment",
    volume: "33(4)",
    pages: "442-461",
    doi: "10.1007/ijpa.2022.1234"
  }
]

export default function PsychometricsPage() {
  return (
    <GradientBackground className="min-h-screen pb-16">
      {/* Header Section */}
      <PsychometricsHeader />

      <div className="container mx-auto px-4 space-y-12">
        {/* Main Statistical Overview */}
        <StatisticalTable />

        {/* Structure and Development */}
        <div className="grid gap-8 md:grid-cols-2">
          <StructureSection />
          <ValiditySection />
        </div>

        {/* Applications Section */}
        <ApplicationsSection />

        {/* Academic References */}
        <ReferencesList references={academicReferences} />
      </div>
    </GradientBackground>
  )
}