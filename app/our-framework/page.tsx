// @/app/our-framework/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { NavTabs } from './components/nav-tabs'
import { FrameworkHero } from './components/hero'

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
      {/* Add other sections here */}
    </div>
  )
}