// app/psychometrics/components/GradientBackground.tsx
"use client"

interface GradientBackgroundProps {
  className?: string
  children: React.ReactNode
}

export function GradientBackground({ className = "", children }: GradientBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Light mode gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/15 dark:to-primary/10" />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/20 opacity-20 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-primary/20 opacity-20 blur-3xl" />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}