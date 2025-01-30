"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { useAttemptState } from '@/hooks/useAttemptState'
import { TestAttemptContext } from "./TestAttemptContext"
import { LoadingState } from "./LoadingState"
import { isGuestQuestion } from "@/lib/utils/question-helpers"
import type { CategoryState } from "./TestAttemptContext"
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"
import type { AttemptError } from "@/lib/errors/attempt-errors"

// Add this helper function
const getQuestionId = (question: TestAttemptQuestion | GuestAttemptQuestion): string => {
  return isGuestQuestion(question) ? question.id : question.questionId
}

interface TestAttemptProviderProps {
  children: React.ReactNode
  params: Promise<{
    testId: string
    attemptId: string
  }>
}

export function TestAttemptProvider({ params, children }: TestAttemptProviderProps) {
  const { isSignedIn } = useAuth()
  const [attemptId, setAttemptId] = useState<string>("")
  const [testId, setTestId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("")
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [categories, setCategories] = useState<CategoryState[]>([]) // Remove eslint-disable
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [error, setError] = useState<AttemptError | null>(null)
  const [lastOperation, setLastOperation] = useState<(() => Promise<void>) | null>(null)

  const {
    questions,
    handleAnswerSelect,
    isPending,
    isSynced,
    fetchQuestions
  } = useAttemptState({ 
    isSignedIn: isSignedIn ?? false, // Add null check
    attemptId,
    testId 
  })

  // Initialize attemptId from params
  useEffect(() => {
    const initializeAttempt = async () => {
      const resolvedParams = await params
      console.log('Resolved params:', resolvedParams)
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    }
    initializeAttempt()
  }, [params])

  // Fetch questions when attemptId is available
  useEffect(() => {
    if (attemptId) {
      console.log('Fetching questions for attemptId:', attemptId)
      fetchQuestions()
    }
  }, [attemptId, fetchQuestions])

  // Initialize categories from questions
  const initializeCategories = useCallback((questions: (TestAttemptQuestion | GuestAttemptQuestion)[]) => {
    const categorizedQuestions = questions.reduce((acc, question) => {
      const categoryId = isGuestQuestion(question) 
        ? question.category?.id || "uncategorized"
        : question.question.categoryId || "uncategorized"
      
      const categoryName = isGuestQuestion(question)
        ? question.category?.name || "Uncategorized"
        : question.question.category?.name || "Uncategorized"

      if (!acc[categoryId]) {
        acc[categoryId] = {
          id: categoryId,
          name: categoryName,
          isCompleted: false,
          questions: []
        }
      }
      acc[categoryId].questions.push(question)
      return acc
    }, {} as Record<string, CategoryState>)

    const sortedCategories = Object.values(categorizedQuestions)
    setCategories(sortedCategories)
    
    // Set initial question if needed
    if (sortedCategories.length && !currentQuestionId && sortedCategories[0].questions.length) {
      setCurrentQuestionId(getQuestionId(sortedCategories[0].questions[0]))
    }
  }, [currentQuestionId])

  // Watch for questions changes and initialize categories
  useEffect(() => {
    if (questions.length > 0) {
      initializeCategories(questions)
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [questions, initializeCategories])

  const currentCategory = categories[currentCategoryIndex] || null
  const nextCategory = categories[currentCategoryIndex + 1] || null
  const isCategoryCompleted = currentCategory?.questions.every(q => 
    'questionId' in q ? q.isAnswered : !!q.selectedOptionId
  ) || false
  const isLastCategory = currentCategoryIndex === categories.length - 1

  const clearError = useCallback(() => setError(null), [])

  // Implement retry operation
  const retryOperation = useCallback(async () => {
    if (lastOperation) {
      setError(null)
      try {
        await lastOperation()
      } catch (e) {
        setError(AttemptErrorBoundary.handleError(e))
      }
    }
  }, [lastOperation])

  // Add store operation utility
  const storeOperation = useCallback((operation: () => Promise<void>) => {
    setLastOperation(() => operation)
  }, [])

  const value = {
    testId,
    attemptId,
    questions,
    currentQuestionId,
    currentCategory,
    nextCategory,
    categories,
    isLoading,
    showCompletionDialog,
    setShowCompletionDialog,
    handleAnswerSelect: useCallback(async (questionId: string, optionId: string) => {
      const operation = async () => {
        await handleAnswerSelect(questionId, optionId)
      }
      storeOperation(operation)
      try {
        await operation()
      } catch (e) {
        setError(AttemptErrorBoundary.handleError(e))
      }
    }, [handleAnswerSelect, storeOperation]),
    setCurrentQuestionId,
    moveToNextCategory: useCallback(() => {
      if (currentCategoryIndex < categories.length - 1) {
        setCurrentCategoryIndex(prev => prev + 1)
      }
    }, [categories.length, currentCategoryIndex]),
    isCategoryCompleted,
    isLastCategory,
    error,
    clearError,       // Add this
    retryOperation,   // Add this
    isPending,
    isSynced
  }

  if (isInitialLoad && isLoading) {
    return <LoadingState />
  }

  return (
    <TestAttemptContext.Provider value={value}>
      {children}
    </TestAttemptContext.Provider>
  )
}