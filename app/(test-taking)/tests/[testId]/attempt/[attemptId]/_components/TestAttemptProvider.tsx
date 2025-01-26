// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestAttemptProvider.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { guestStorage } from "@/lib/storage/guest-storage"
import { TestAttemptContext, type CategoryState } from "./TestAttemptContext" // Add CategoryState import
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
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [categories, setCategories] = useState<CategoryState[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [attemptId, setAttemptId] = useState<string>("")
  const [testId, setTestId] = useState<string>("")
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

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
      setCurrentQuestionId(sortedCategories[0].questions[0].id)
    }
  }, [currentQuestionId])

  // Get current category and completion status
  const currentCategory = categories[currentCategoryIndex] || null
  const isCategoryCompleted = currentCategory?.questions.every(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ) || false
  const isLastCategory = currentCategoryIndex === categories.length - 1

  // Handle moving to next category
  const handleNextCategory = useCallback(() => {
    if (isCategoryCompleted && !isLastCategory) {
      setCurrentCategoryIndex(prev => prev + 1)
      const nextCategory = categories[currentCategoryIndex + 1]
      if (nextCategory?.questions.length) {
        setCurrentQuestionId(nextCategory.questions[0].id)
      }
    }
  }, [isCategoryCompleted, isLastCategory, categories, currentCategoryIndex])

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

  // Fetch questions and initialize categories
  useEffect(() => {
    if (!attemptId) return

    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const endpoint = isSignedIn 
          ? `/api/tests/attempt/${attemptId}/questions`
          : `/api/tests/guest/attempt/${attemptId}/questions`

        const response = await fetch(endpoint)
        if (!response.ok) throw new Error(await response.text())

        const data = await response.json()
        setQuestions(data.questions)
        initializeCategories(data.questions)
      } catch (error) {
        console.error("Failed to load questions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchQuestions()
  }, [attemptId, isSignedIn, initializeCategories])

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

  const value = {
    testId,
    attemptId,
    questions,
    currentQuestionId,
    currentCategory,
    categories,
    nextCategoryId: isLastCategory ? null : categories[currentCategoryIndex + 1]?.id || null,
    isLoading,
    showCompletionDialog,
    setShowCompletionDialog,
    handleAnswerSelect,
    setCurrentQuestionId,
    moveToNextCategory: handleNextCategory,
    isCategoryCompleted,
    isLastCategory
  }

  return (
    <TestAttemptContext.Provider value={value}>
      {children}
    </TestAttemptContext.Provider>
  )
}