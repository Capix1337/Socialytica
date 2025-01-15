// @/app/our-framework/components/ui/expandable-card.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
// import { cn } from "@/lib/utils"

interface ExpandableCardProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

export function ExpandableCard({
  title,
  children,
  defaultExpanded = false,
  className,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className={className}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-accent/50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-left">{title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-0">
              {children}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}