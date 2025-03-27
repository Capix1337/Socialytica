import Shero from "@/components/Shero"
import { Metadata } from "next"
import NewsletterSection from "@/components/newsletter/NewsletterSection";
// import { Newsletter } from "@/components/newsletter"
import TestsSection from "@/components/tests/TestsSection";
import EvidenceSection from "@/components/features/EvidenceSection";
import InsightSection from "@/components/features/InsightSection";
import AccessSection from "@/components/features/AccessSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import StepsComponent from "@/components/journey/StepsComponent";
import CTASection from "@/components/cta/CTASection";

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
      <CTASection />
      <NewsletterSection />
    </main>
  )
}