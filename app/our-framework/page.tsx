// @/app/our-framework/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { NavTabs } from './components/nav-tabs'
import { FrameworkHero } from './components/hero'
import { TheorySection } from './components/theory-section'
import { ValuesGoalsPillar } from './components/pillars/ValuesGoalsPillar'
import { SexualityPillar } from './components/pillars/SexualityPillar'
import { CommunicationPillar } from './components/pillars/CommunicationPillar'
import { TrustPillar } from './components/pillars/TrustPillar'
import { SynergySection } from './components/synergy-section'
import { TraitsSection } from './components/traits-section'
import { PredictionsSection } from './components/predictions-section'
import { SectionHeader } from './components/ui/section-header'
import { cn } from './utils/cn'

export default function FrameworkPage() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      {/* Fixed Navigation */}
      <NavTabs activeSection={activeSection} />
      
      {/* Main Content */}
      <div className={cn(
        "relative transition-all duration-300",
        "ml-[16px] md:ml-[64px]" // Minimum width when collapsed
      )}>
        {/* Hero Section */}
        <section id="hero">
          <FrameworkHero />
        </section>

        {/* Theory Section */}
        <section id="theory">
          <TheorySection />
        </section>

        {/* Pillars Section */}
        <section id="pillars" className="py-24">
          <div className="container px-4 md:px-6">
            <SectionHeader 
              title="The Four Pillars"
              description="Our comprehensive framework analyzes relationships through four fundamental dimensions"
            />
            <div className="grid gap-8 max-w-5xl mx-auto">
              <ValuesGoalsPillar />
              <SexualityPillar />
              <CommunicationPillar />
              <TrustPillar />
            </div>
          </div>
        </section>

        {/* Synergy Section */}
        <section id="synergy">
          <SynergySection />
        </section>

        {/* Traits Section */}
        <section id="traits">
          <TraitsSection />
        </section>

        {/* Predictions Section */}
        <section id="predictions">
          <PredictionsSection />
        </section>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[20%] top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-[20%] top-3/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </div>
  )
}