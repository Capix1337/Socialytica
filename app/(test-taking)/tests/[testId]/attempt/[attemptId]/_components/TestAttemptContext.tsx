// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestAttemptContext.tsx
"use client"

import { createContext, useContext } from "react"
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface TestAttemptContextType {
  testId: string
  attemptId: string
  questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
  currentQuestionId: string
  currentCategoryId: string
  isLoading: boolean
  showCompletionDialog: boolean
  setShowCompletionDialog: (show: boolean) => void
  handleAnswerSelect: (questionId: string, optionId: string) => Promise<void>
  setCurrentQuestionId: (id: string) => void
  setCurrentCategoryId: (id: string) => void
}

export const TestAttemptContext = createContext<TestAttemptContextType | undefined>(undefined)

export function useTestAttempt() {
  const context = useContext(TestAttemptContext)
  if (!context) {
    throw new Error("useTestAttempt must be used within a TestAttemptProvider")
  }
  return context
}