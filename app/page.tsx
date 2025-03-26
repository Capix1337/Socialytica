import Shero from "@/components/Shero"
import { Metadata } from "next"
import { FeaturesGrid } from "@/components/features-grid"
import { HowItWorks } from "@/components/how-it-works"
import { CallToAction } from "@/components/call-to-action"
import { Newsletter } from "@/components/newsletter"
import TestsSection from "@/components/tests/TestsSection";
import EvidenceSection from "@/components/features/EvidenceSection";
import InsightSection from "@/components/features/InsightSection";
import AccessSection from "@/components/features/AccessSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import StepsComponent from "@/components/journey/StepsComponent";

export const metadata: Metadata = {
  title: "Socialytica | Relationship Psychology Tests & Analysis",
  description: "Discover insights about your relationships through scientifically-designed psychological tests. Get personalized analysis and improve your connections with others.",
}

export default function HomePage() {
  return (
    <main>
      <Shero />
      <TestsSection />
      <EvidenceSection />
      <InsightSection />
      <AccessSection />
      <FeaturesSection />
      <StepsComponent />
      <FeaturesGrid />
      <HowItWorks />
      <CallToAction />
      <Newsletter />
    </main>
  )
}