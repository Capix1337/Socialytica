"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const quotes = [
  "Insight leads to empowerment, and empowerment leads to change.",
  "The more you understand, the more you can achieve.",
  "Seeing the full picture of your journey brings new perspective.",
  "Understanding your strengths and challenges leads to meaningful progress.",
  "Every step forward begins with understanding where you are now.",
  "Understanding the present unlocks the full potential of the future."
]

const Hero = () => {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container px-4 md:px-6 py-8 md:py-16 lg:py-24">
        <div className="flex flex-col items-center space-y-6 md:space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl space-y-6"
          >
            <div className="relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground absolute max-w-[95%] sm:max-w-[85%] md:max-w-[80%] xl:max-w-[1200px] leading-[1.2] px-4"
                >
                  {quotes[currentQuote]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p className="mx-auto max-w-[800px] text-muted-foreground text-lg sm:text-xl md:text-2xl px-4">
              Discover what truly drives your relationship and move forward with clarity
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-xs sm:max-w-sm"
          >
            <Button size="lg" className="w-full" asChild>
              <Link href="/tests">
                Take the Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl px-4"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
              >
                {feature.icon}
                <h3 className="text-lg sm:text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: "Evidence-Driven",
    description: "Our Relationship Test is grounded in decades of proven psychological and therapeutic research.",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    title: "Instant Access",
    description: "Start your test today and get immediate insights into your relationship's strengths and areas for growth.",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
  {
    title: "Personalized Solutions",
    description: "Receive tailored recommendations to address specific areas in need of improvement, based on your unique relationship dynamics.",
    icon: <Heart className="h-6 w-6 text-primary" />,
  }
]

export default Hero
