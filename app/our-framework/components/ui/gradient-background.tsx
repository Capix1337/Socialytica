// @/app/our-framework/components/ui/gradient-background.tsx
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientBackgroundProps {
  children: React.ReactNode
  className?: string
  intensity?: "light" | "medium" | "strong"
}

export function GradientBackground({
  children,
  className,
  intensity = "medium"
}: GradientBackgroundProps) {
  const gradientOpacity = {
    light: "opacity-[0.15]",
    medium: "opacity-[0.25]",
    strong: "opacity-[0.35]"
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated gradient background */}
      <motion.div
        className={cn(
          "absolute inset-0 -z-10",
          gradientOpacity[intensity]
        )}
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
          transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
        style={{
          background: `
            radial-gradient(circle at top left, var(--primary), transparent),
            radial-gradient(circle at top right, var(--chart-1), transparent),
            radial-gradient(at bottom left, var(--chart-3), transparent)
          `
        }}
      />
      {children}
    </div>
  )
}