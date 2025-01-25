"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
// import { AlertTriangle } from "lucide-react"
import { useAuth } from "@clerk/nextjs"

interface NavigationControlsProps {
  testId: string
  attemptId: string
  currentQuestionNumber: number
  totalQuestions: number
  answeredQuestions: number
  canGoNext: boolean
  canGoPrevious: boolean
  onNext: () => void
  onPrevious: () => void
}

export function NavigationControls({
  testId,
  attemptId,
  currentQuestionNumber,
  totalQuestions,
  answeredQuestions,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
}: NavigationControlsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  const handleCompleteTest = async () => {
    try {
      setIsSubmitting(true)
      // Use different endpoints for guest and authenticated users
      const endpoint = isSignedIn
        ? `/api/tests/attempt/${attemptId}/complete`
        : `/api/tests/guest/attempt/${attemptId}/complete`

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) throw new Error('Failed to complete test')

      const data = await res.json()
      
      if (data.success) {
        router.push(`/tests/${testId}/attempt/${attemptId}/results`)
      } else {
        throw new Error(data.error || 'Failed to complete test')
      }
    } catch (error) {
      console.error('Error completing test:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToCurrentQuestion = () => {
    const questionElement = document.getElementById(`question-${currentQuestionNumber}`)
    if (questionElement) {
      // Add offset for the sticky header height
      const headerOffset = 140 // Adjust this value based on your header height
      const elementPosition = questionElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleNext = () => {
    onNext()
    // Wait for state update and DOM to reflect changes
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToCurrentQuestion()
      })
    })
  }

  const handlePrevious = () => {
    onPrevious()
    // Wait for state update and DOM to reflect changes
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToCurrentQuestion()
      })
    })
  }

  return (
    <div className="bg-white py-4 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={!canGoNext}
          >
            Next
          </Button>
          <span className="text-sm text-muted-foreground hidden md:inline">
            Question {currentQuestionNumber} of {totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {answeredQuestions} of {totalQuestions} answered
          </span>
          <Button
            onClick={handleCompleteTest}
            disabled={answeredQuestions < totalQuestions || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Complete Test"}
          </Button>
        </div>
      </div>
    </div>
  )
}