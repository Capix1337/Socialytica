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
  const [categories, setCategories] = useState<CategoryState[]>([])
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [error, setError] = useState<AttemptError | null>(null)

  const {
    questions,
    handleAnswerSelect,
    isPending,
    isSynced,
    fetchQuestions
  } = useAttemptState({ 
    isSignedIn: isSignedIn ?? false,
    attemptId,
    testId 
  })

  // Initialize params
  useEffect(() => {
    const initializeAttempt = async () => {
      const resolvedParams = await params
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    }
    initializeAttempt()
  }, [params])

  // Watch for questions changes
  useEffect(() => {
    if (questions.length > 0) {
      setIsLoading(false)
      setIsInitialLoad(false)
    }
  }, [questions])

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
    
    if (sortedCategories.length && !currentQuestionId && sortedCategories[0].questions.length) {
      setCurrentQuestionId(getQuestionId(sortedCategories[0].questions[0]))
    }
  }, [currentQuestionId])

  // Fetch questions when attemptId is available
  useEffect(() => {
    if (attemptId && testId) {
      fetchQuestions()
    }
  }, [attemptId, testId, fetchQuestions])

  // Update categories when questions change
  useEffect(() => {
    if (questions.length > 0) {
      initializeCategories(questions)
    }
  }, [questions, initializeCategories])

  const currentCategory = categories[currentCategoryIndex] || null
  const nextCategory = categories[currentCategoryIndex + 1] || null
  const isCategoryCompleted = currentCategory?.questions.every(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ) || false
  const isLastCategory = currentCategoryIndex === categories.length - 1

  const moveToNextCategory = useCallback(() => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1)
      if (categories[currentCategoryIndex + 1]?.questions.length) {
        const nextQuestion = categories[currentCategoryIndex + 1].questions[0]
        setCurrentQuestionId(getQuestionId(nextQuestion))
      }
    }
  }, [categories, currentCategoryIndex])

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
    handleAnswerSelect,
    setCurrentQuestionId,
    moveToNextCategory,
    isCategoryCompleted,
    isLastCategory,
    error,
    setError,
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