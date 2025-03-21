import Hero from "@/components/hero"
import { Metadata } from "next"
import { FeaturesGrid } from "@/components/features-grid"
import { HowItWorks } from "@/components/how-it-works"
import { CallToAction } from "@/components/call-to-action"
import { Newsletter } from "@/components/newsletter"
// import RecentBlogPosts from "./components/RecentBlogPosts";

export const metadata: Metadata = {
  title: "Socialytica | Relationship Psychology Tests & Analysis",
  description: "Discover insights about your relationships through scientifically-designed psychological tests. Get personalized analysis and improve your connections with others.",
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <CallToAction />
      {/* <RecentBlogPosts /> */} 
      <Newsletter />
    </main>
  )
}