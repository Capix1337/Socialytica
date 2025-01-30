// hooks/useAttemptState.ts

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { attemptStorage } from '@/lib/storage/attempt-storage'
import { syncManager } from '@/lib/sync/sync-manager'
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface UseAttemptStateProps {
  isSignedIn: boolean
  attemptId: string
  testId: string
}

// Add OptimisticUpdate types
type OptimisticTestAttemptQuestion = TestAttemptQuestion & { _optimistic?: boolean }
type OptimisticGuestAttemptQuestion = GuestAttemptQuestion & { _optimistic?: boolean }
type OptimisticQuestion = OptimisticTestAttemptQuestion | OptimisticGuestAttemptQuestion

export function useAttemptState({ isSignedIn, attemptId }: UseAttemptStateProps) {
  const [questions, setQuestions] = useState<OptimisticQuestion[]>([])
  const [pendingSync, setPendingSync] = useState<Set<string>>(new Set())

  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      // Optimistic update with proper typing
      setQuestions(prev => prev.map(q => {
        if ('questionId' in q && q.questionId === questionId) {
          return {
            ...q,
            selectedOptionId: optionId,
            isAnswered: true,
            _optimistic: true
          } as OptimisticTestAttemptQuestion
        } else if ('id' in q && q.id === questionId) {
          return {
            ...q,
            selectedOptionId: optionId,
            _optimistic: true
          } as OptimisticGuestAttemptQuestion
        }
        return q
      }))

      // Cache and queue for sync
      attemptStorage.cacheAnswer(attemptId, questionId, optionId)
      setPendingSync(prev => new Set(prev).add(questionId))

      // Queue for batch sync
      syncManager.queueSync({
        attemptId,
        questionId,
        selectedOptionId: optionId,
        timestamp: Date.now()
      })

    } catch (error) {
      toast.error('Failed to save answer. Please try again.')
      console.error('Answer selection error:', error)
    }
  }, [attemptId])

  const fetchQuestions = useCallback(async () => {
    if (!attemptId) return

    try {
      const endpoint = isSignedIn
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      console.log('Fetching questions from:', endpoint) // Debug log

      const response = await fetch(endpoint)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch questions')
      }
      
      const data = await response.json()
      if (!data.questions) {
        throw new Error('No questions data received')
      }
      
      setQuestions(data.questions)
    } catch (error) {
      console.error('Error fetching questions:', error)
      toast.error('Failed to load questions. Please try again.')
    }
  }, [attemptId, isSignedIn])

  return {
    questions,
    handleAnswerSelect,
    isPending: (questionId: string) => pendingSync.has(questionId),
    isSynced: (questionId: string) => !pendingSync.has(questionId),
    fetchQuestions // Export this
  }
}