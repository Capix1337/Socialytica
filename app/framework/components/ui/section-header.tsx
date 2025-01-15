// @/app/our-framework/components/ui/section-header.tsx
"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  description: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center mb-12"
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto max-w-[800px] text-muted-foreground text-lg">
        {description}
      </p>
    </motion.div>
  )
}