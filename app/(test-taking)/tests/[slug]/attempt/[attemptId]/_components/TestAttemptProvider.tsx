// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestAttemptProvider.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { guestStorage, type GuestCategoryProgress } from "@/lib/storage/guest-storage"
import { TestAttemptContext, type CategoryState } from "./TestAttemptContext"
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

export function TestAttemptProvider({ params, children }: TestAttemptProviderProps) {
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
  const nextCategory = categories[currentCategoryIndex + 1] || null
  const isCategoryCompleted = currentCategory?.questions.every(q => 
    isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
  ) || false
  const isLastCategory = currentCategoryIndex === categories.length - 1

  // Define saveProgress before using it
  const saveProgress = useCallback(() => {
    if (!isSignedIn && attemptId) {
      const progress: GuestCategoryProgress = {
        currentCategoryIndex,
        completedCategories: categories
          .filter(cat => cat.questions.every(q => 
            isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
          ))
          .map(cat => cat.id),
        lastUpdated: Date.now(),
        categoryTransitions: []
      }
      guestStorage.saveAttemptProgress(attemptId, progress)
    }
  }, [attemptId, categories, currentCategoryIndex, isSignedIn])

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
    async function fetchQuestions() {
      if (!attemptId) return;
      
      try {
        setIsLoading(true)
        const endpoint = isSignedIn 
          ? `/api/tests/attempt/${attemptId}/questions`
          : `/api/tests/guest/attempt/${attemptId}/questions`

        // Only make the request to the appropriate endpoint based on auth status
        const res = await fetch(endpoint)
        
        if (!res.ok) {
          throw new Error('Failed to fetch questions')
        }

        const data = await res.json()
        setQuestions(data.questions)
        initializeCategories(data.questions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions();
  }, [attemptId, isSignedIn, initializeCategories])

  // Handle answer selection
  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      const endpoint = isSignedIn
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      // Always do optimistic update regardless of auth status
      setQuestions(prevQuestions => 
        prevQuestions.map(q => {
          // Check both questionId and q.id for compatibility
          const qId = isGuestQuestion(q) ? q.id : q.questionId
          if (qId === questionId) {
            return {
              ...q,
              selectedOptionId: optionId,
              isAnswered: true
            }
          }
          return q
        })
      )

      // Always update categories immediately
      setCategories(prevCategories => 
        prevCategories.map(category => ({
          ...category,
          questions: category.questions.map(q => {
            const qId = isGuestQuestion(q) ? q.id : q.questionId
            if (qId === questionId) {
              return {
                ...q,
                selectedOptionId: optionId,
                isAnswered: true
              }
            }
            return q
          })
        }))
      )

      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId,
          selectedOptionId: optionId
        })
      })

      if (!res.ok) {
        // Revert on error for both guest and logged-in users
        setQuestions(prevQuestions => 
          prevQuestions.map(q => {
            const qId = isGuestQuestion(q) ? q.id : q.questionId
            if (qId === questionId) {
              return {
                ...q,
                selectedOptionId: null,
                isAnswered: false
              }
            }
            return q
          })
        )
        throw new Error('Failed to save answer')
      }

      // Check category completion and navigate after successful save
      const updatedCategory = categories[currentCategoryIndex]
      const categoryComplete = updatedCategory.questions.every(q => 
        isGuestQuestion(q) ? !!q.selectedOptionId : q.isAnswered
      )

      if (categoryComplete && !isLastCategory) {
        handleNextCategory()
      }

    } catch (error) {
      console.error('Failed to save answer:', error)
    }
}, [attemptId, isSignedIn, categories, currentCategoryIndex, isLastCategory, handleNextCategory])

  // Initialize params
  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    })
  }, [params])

  useEffect(() => {
    saveProgress()
  }, [saveProgress, questions, currentCategoryIndex])

  const value = {
    testId,
    attemptId,
    questions,
    currentQuestionId,
    currentCategory,
    nextCategory, // Add this line to include nextCategory
    categories,
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