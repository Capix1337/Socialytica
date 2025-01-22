// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/CompletionDialog.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface CompletionDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  testId: string
  attemptId: string
  questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
}

export function CompletionDialog({
  isOpen,
  onOpenChange,
  testId,
  attemptId,
  questions
}: CompletionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    // Handle both guest and authenticated question structures
    const isGuestQuestion = 'title' in question;
    const categoryName = isGuestQuestion 
      ? question.category?.name || "Uncategorized"
      : question.question.category?.name || "Uncategorized";

    if (!acc[categoryName]) {
      acc[categoryName] = { total: 0, answered: 0 }
    }
    acc[categoryName].total++
    
    // Handle answered state for both types
    if (isGuestQuestion ? !!question.selectedOptionId : question.isAnswered) {
      acc[categoryName].answered++
    }
    return acc
  }, {} as Record<string, { total: number; answered: number }>)

  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => 
    'title' in q ? !!q.selectedOptionId : q.isAnswered
  ).length
  const hasUnanswered = answeredQuestions < totalQuestions

  const handleComplete = async () => {
    try {
      setIsSubmitting(true)
      
      // Use different endpoints for guest and authenticated users
      const endpoint = isSignedIn 
        ? `/api/tests/attempt/${attemptId}/complete`
        : `/api/tests/guest/attempt/${attemptId}/complete`

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to complete test")
      }

      const data = await response.json()
      
      if (data.success) {
        toast.success("Test completed successfully!")
        router.push(`/tests/${testId}/attempt/${attemptId}/results`)
      } else {
        throw new Error(data.error || "Failed to complete test")
      }
    } catch (error) {
      console.error("Complete test error:", error)
      toast.error("Failed to complete test. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Complete Test?</AlertDialogTitle>
          <AlertDialogDescription>
            {hasUnanswered ? (
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertTriangle className="h-4 w-4" />
                <span>You have {totalQuestions - answeredQuestions} unanswered questions</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>All questions have been answered</span>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-6 space-y-4">
          <h4 className="text-sm font-medium">Progress by Category</h4>
          {Object.entries(questionsByCategory).map(([category, stats]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{category}</span>
                <span>{stats.answered}/{stats.total}</span>
              </div>
              <Progress 
                value={(stats.answered / stats.total) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleComplete}
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting..." : "Complete Test"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}