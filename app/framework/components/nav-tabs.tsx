// @/app/our-framework/components/nav-tabs.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const sections = [
  { id: "hero", label: "Overview" },
  { id: "theory", label: "Theory" },
  { id: "pillars", label: "Four Pillars" },
  { id: "synergy", label: "Synergy & Thresholds" },
  { id: "traits", label: "Personal Traits" },
  { id: "predictions", label: "Predictions" }
]

interface NavTabsProps {
  activeSection: string;
}

export function NavTabs({ activeSection }: NavTabsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed left-0 top-20 z-40 flex">
      {/* Main Navigation Panel */}
      <motion.div 
        className="bg-card border-r border-border h-[calc(100vh-5rem)] overflow-hidden"
        animate={{
          width: isExpanded ? 256 : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="w-64"> {/* Fixed width container */}
          <nav className="p-4 space-y-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "flex items-center px-4 py-2 text-sm rounded-lg transition-colors relative whitespace-nowrap",
                  activeSection === section.id 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary rounded-lg -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </a>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-12 px-2 bg-primary text-primary-foreground rounded-r-lg shadow-lg flex items-center justify-center"
      >
        <span className="sr-only">
          {isExpanded ? "Collapse navigation" : "Expand navigation"}
        </span>
        {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
    </div>
  )
}