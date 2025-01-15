// @/app/our-framework/components/ui/animated-counter.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  formatValue?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1,
  formatValue = (v) => Math.round(v).toString(),
  className
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [isAnimating, setIsAnimating] = useState(false)

  const spring = useSpring(0, {
    duration: duration * 1000,
    onComplete: () => setIsAnimating(false)
  })

  const displayed = useTransform(spring, (current) => formatValue(current))

  useEffect(() => {
    if (inView && !isAnimating) {
      setIsAnimating(true)
      spring.set(value)
    }
  }, [inView, value, spring, isAnimating])

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {displayed}
    </motion.span>
  )
}