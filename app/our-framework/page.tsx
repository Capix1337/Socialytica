// @/app/our-framework/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { NavTabs } from './components/nav-tabs'
import { FrameworkHero } from './components/hero'
import { TheorySection } from './components/theory-section'
import { ValuesGoalsPillar } from './components/pillars/ValuesGoalsPillar'

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
    <div className="min-h-screen bg-background">
      <NavTabs activeSection={activeSection} />
      <section id="hero">
        <FrameworkHero />
      </section>
      <section id="theory">
        <TheorySection />
      </section>
      <section id="pillars">
        <div className="container py-24 space-y-12">
          <ValuesGoalsPillar />
          {/* Add other pillars here */}
        </div>
      </section>
    </div>
  )
}