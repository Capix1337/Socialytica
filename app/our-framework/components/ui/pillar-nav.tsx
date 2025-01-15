// @/app/our-framework/components/ui/pillar-nav.tsx
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PillarNavProps {
  items: {
    id: string
    label: string
  }[]
  activeItem: string
  onChange: (id: string) => void
  className?: string
}

export function PillarNav({ 
  items, 
  activeItem, 
  onChange,
  className 
}: PillarNavProps) {
  return (
    <div className={cn("flex space-x-2 p-1 bg-muted rounded-lg", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            "relative px-3 py-1.5 text-sm font-medium transition-colors",
            "hover:text-foreground",
            activeItem === item.id ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {item.label}
          {activeItem === item.id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute inset-0 bg-primary rounded"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30
              }}
            />
          )}
        </button>
      ))}
    </div>
  )
}