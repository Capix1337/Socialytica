"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"
import { useAttemptState } from '@/hooks/useAttemptState'
import { TestAttemptContext } from "./TestAttemptContext"
import { LoadingState } from "./LoadingState"
import { isGuestQuestion } from "@/lib/utils/question-helpers"
import { attemptStorage } from "@/lib/storage/attempt-storage"
import type { CategoryState } from "./TestAttemptContext"
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"
import { AttemptError, AttemptErrorBoundary } from "@/lib/errors/attempt-errors"

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
  const [pendingChanges, setPendingChanges] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [pendingSyncQuestions, setPendingSyncQuestions] = useState<Set<string>>(new Set<string>())
  const [isSyncingDraft, setIsSyncingDraft] = useState(false)

  const {
    questions,
    handleAnswerSelect: originalHandleAnswerSelect,
    isPending: checkPending,    // Rename to avoid conflict
    isSynced: checkSynced,     // Rename to avoid conflict
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

  // Remove unnecessary dependencies from callbacks
  const isPending = useCallback((questionId: string) => {
    return checkPending(questionId)
  }, [checkPending]) // Only depend on the function from useAttemptState

  const isSynced = useCallback((questionId: string) => {
    return checkSynced(questionId)
  }, [checkSynced]) // Only depend on the function from useAttemptState

  const verifySync = useCallback(async () => {
    if (pendingSyncQuestions.size === 0) return true
    
    try {
      const questionsToVerify = Array.from(pendingSyncQuestions)
      const response = await fetch(`/api/tests/attempt/${attemptId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionIds: questionsToVerify })
      })
  
      if (!response.ok) throw new Error('Sync verification failed')
      
      const { synced } = await response.json()
      return synced
    } catch (error) {
      console.error('Sync verification error:', error)
      return false
    }
  }, [attemptId, pendingSyncQuestions])

  const handleSaveDraft = useCallback(async () => {
    if (isSyncingDraft) return
    
    try {
      setIsSyncingDraft(true)
      
      // Wait for any pending syncs to complete
      const isSynced = await verifySync()
      if (!isSynced) {
        toast.error('Some answers are still syncing. Please try again.')
        return
      }
  
      // Save to storage and update state
      await attemptStorage.saveAnswers(attemptId, questions)
      setLastSaved(new Date())
      setPendingChanges(0)
      toast.success('Draft saved successfully')
    } catch (error) {
      toast.error('Failed to save draft')
      console.error('Save draft error:', error)
    } finally {
      setIsSyncingDraft(false)
    }
  }, [attemptId, questions, verifySync, isSyncingDraft])

  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      setPendingSyncQuestions(prev => new Set(prev).add(questionId))
      
      await originalHandleAnswerSelect(questionId, optionId)
      
      // After successful sync
      setPendingSyncQuestions(prev => {
        const updated = new Set(prev)
        updated.delete(questionId)
        return updated
      })
    } catch (error) {
      console.error('Answer selection error:', error)
      throw error
    }
  }, [originalHandleAnswerSelect])

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
        setPendingChanges(prev => prev + 1) // Increment pending changes
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
    clearError,       
    retryOperation,   
    isPending,
    isSynced,
    pendingChanges, 
    lastSaved,      
    handleSaveDraft,
    isSyncingDraft,
    pendingSyncQuestions
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