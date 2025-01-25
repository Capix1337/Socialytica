// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestAttemptProvider.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { guestStorage } from "@/lib/storage/guest-storage"
import { TestAttemptContext } from "./TestAttemptContext"
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface TestAttemptProviderProps {
  children: React.ReactNode
  params: Promise<{
    testId: string
    attemptId: string
  }>
}

// Helper function to check if question is guest question
const isGuestQuestion = (
  question: TestAttemptQuestion | GuestAttemptQuestion
): question is GuestAttemptQuestion => {
  return 'title' in question
}

export function TestAttemptProvider({ children, params }: TestAttemptProviderProps) {
  const { isSignedIn } = useAuth()
  const [questions, setQuestions] = useState<(TestAttemptQuestion | GuestAttemptQuestion)[]>([])
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("")
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [attemptId, setAttemptId] = useState<string>("")
  const [testId, setTestId] = useState<string>("")
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  // Handle loading guest attempt data
  useEffect(() => {
    if (!isSignedIn && attemptId) {
      const savedAttempt = guestStorage.getAttempt(attemptId)
      if (savedAttempt) {
        setQuestions(prevQuestions => 
          prevQuestions.map(q => {
            const savedResponse = savedAttempt.responses.find(
              r => r.questionId === q.id
            )
            if (savedResponse) {
              return {
                ...q,
                selectedOptionId: savedResponse.selectedOptionId,
                isAnswered: true
              }
            }
            return q
          })
        )
      }
    }
  }, [isSignedIn, attemptId])

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    if (!attemptId) return

    try {
      const endpoint = isSignedIn 
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(await response.text())
      }

      const data = await response.json()
      setQuestions(data.questions)
      
      if (data.questions.length > 0) {
        setCurrentQuestionId(data.questions[0].id)
        setCurrentCategoryId(
          data.questions[0]?.question?.categoryId || "uncategorized"
        )
      }
    } catch (error) {
      console.error("Failed to load questions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [attemptId, isSignedIn])

  // Handle answer selection
  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      const endpoint = isSignedIn 
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId,
          selectedOptionId: optionId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit answer')
      }

      const data = await response.json()

      if (!isSignedIn && data.success) {
        guestStorage.saveGuestResponse(
          attemptId,
          questionId,
          optionId,
          data.pointsEarned,
          data.maxPoints
        )
      }

      setQuestions(prev => prev.map(q => {
        if ((isGuestQuestion(q) ? q.id : q.questionId) === questionId) {
          return {
            ...q,
            selectedOptionId: optionId,
            isAnswered: !isGuestQuestion(q)
          }
        }
        return q
      }))
    } catch (error) {
      console.error("Error saving answer:", error)
    }
  }, [attemptId, isSignedIn])

  // Initialize params
  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    })
  }, [params])

  // Fetch questions when attemptId is available
  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const value = {
    testId,
    attemptId,
    questions,
    currentQuestionId,
    currentCategoryId,
    isLoading,
    showCompletionDialog,
    setShowCompletionDialog,
    handleAnswerSelect,
    setCurrentQuestionId,
    setCurrentCategoryId
  }

  return (
    <TestAttemptContext.Provider value={value}>
      {children}
    </TestAttemptContext.Provider>
  )
}