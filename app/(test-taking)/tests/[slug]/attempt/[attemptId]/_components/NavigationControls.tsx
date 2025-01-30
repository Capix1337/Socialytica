// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/NavigationControls.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { useTestAttempt } from "./TestAttemptContext"
import { toast } from "sonner"
import { validateTestAttempt } from "@/lib/utils/test-validation"
import { Progress } from "@/components/ui/progress"

// Add this interface definition
interface NavigationControlsProps {
  testId: string
  attemptId: string
  currentQuestionNumber: number  // Add this line
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
  currentQuestionNumber,  // Add this to props
  totalQuestions,
  answeredQuestions,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
}: NavigationControlsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showCategoryTransition, setShowCategoryTransition] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { 
    isCategoryCompleted, 
    isLastCategory,
    currentCategory,
    nextCategory,
    questions,
    moveToNextCategory 
  } = useTestAttempt()

  const handleCompleteTest = async () => {
    try {
      setIsSubmitting(true)

      // 1. Validate test completion
      const validation = validateTestAttempt(questions)
      if (validation.hasUnanswered) {
        toast.warning(`You have ${validation.totalQuestions - validation.answeredQuestions} unanswered questions`)
      }

      // 2. Select appropriate API endpoint
      const endpoint = isSignedIn
        ? `/api/tests/attempt/${attemptId}/complete`
        : `/api/tests/guest/attempt/${attemptId}/complete`

      // 3. Submit completion request
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      // 4. Handle API response
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to complete test")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || "Failed to complete test")
      }

      // 5. Handle successful completion
      toast.success("Test completed successfully!")
      router.push(`/tests/${testId}/attempt/${attemptId}/results`)

    } catch (error) {
      console.error("Error completing test:", error)
      toast.error(error instanceof Error ? error.message : "Failed to complete test")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToCurrentQuestion = () => {
    const questionElement = document.getElementById(`question-${currentQuestionNumber}`)
    if (questionElement) {
      const headerOffset = 140
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
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToCurrentQuestion()
      })
    })
  }

  const handlePrevious = () => {
    onPrevious()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToCurrentQuestion()
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCategoryTransition = () => {
    setShowCategoryTransition(true)
    setTimeout(() => {
      moveToNextCategory()
      setShowCategoryTransition(false)
    }, 1500)
  }

  return (
    <>
      <div className="bg-white py-4 px-4 md:px-6 border-t">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
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
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionNumber} of {totalQuestions}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Progress 
                value={(answeredQuestions / totalQuestions) * 100} 
                className="w-24 h-2"
              />
              <span className="text-sm text-muted-foreground">
                {answeredQuestions}/{totalQuestions}
              </span>
            </div>

            {isCategoryCompleted && isLastCategory && (
              <Button 
                onClick={handleCompleteTest}
                disabled={isSubmitting}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete Test
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showCategoryTransition} onOpenChange={setShowCategoryTransition}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Moving to Next Category</DialogTitle>
            <DialogDescription>
              <div className="space-y-2">
                <p>You&apos;ve completed: {currentCategory?.name}</p>
                <p>Up next: {nextCategory?.name}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Test?</DialogTitle>
            <DialogDescription>
              {answeredQuestions < totalQuestions ? (
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-4 w-4" />
                  You have {totalQuestions - answeredQuestions} unanswered questions
                </div>
              ) : (
                "Are you sure you want to complete the test?"
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCompleteTest}>
              Complete Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}