import Shero from "@/components/Shero"
import { Metadata } from "next"
import { FeaturesGrid } from "@/components/features-grid"
import { HowItWorks } from "@/components/how-it-works"
import { CallToAction } from "@/components/call-to-action"
import { Newsletter } from "@/components/newsletter"
import TestsSection from "@/components/tests/TestsSection";


export const metadata: Metadata = {
  title: "Socialytica | Relationship Psychology Tests & Analysis",
  description: "Discover insights about your relationships through scientifically-designed psychological tests. Get personalized analysis and improve your connections with others.",
}

export default function HomePage() {
  return (
    <main>
      <Shero />
      <TestsSection />
      <FeaturesGrid />
      <HowItWorks />
      <CallToAction />
      <Newsletter />
    </main>
  )
}