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
  testId: string  // Add testId
}

type AttemptQuestion = TestAttemptQuestion | GuestAttemptQuestion;

export function useAttemptState({ isSignedIn, attemptId, testId }: UseAttemptStateProps) {
  const [questions, setQuestions] = useState<AttemptQuestion[]>([])
  const [pendingSync, setPendingSync] = useState<Set<string>>(new Set())

  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      // Optimistic update
      setQuestions(prev => prev.map(q => {
        if ('questionId' in q && q.questionId === questionId) {
          return {
            ...q,
            selectedOptionId: optionId,
            isAnswered: true,
            _optimistic: true
          } as TestAttemptQuestion
        } else if ('id' in q && q.id === questionId) {
          return {
            ...q,
            selectedOptionId: optionId,
            _optimistic: true
          } as GuestAttemptQuestion
        }
        return q
      }))

      // Cache the answer
      attemptStorage.cacheAnswer(attemptId, questionId, optionId)
      setPendingSync(prev => new Set(prev).add(questionId))

      // Queue sync
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
    if (!attemptId || !testId) return

    try {
      // Use the correct API endpoint based on auth status
      const endpoint = isSignedIn
        ? `/api/tests/${testId}/attempt/${attemptId}/questions`
        : `/api/tests/guest/${testId}/attempt/${attemptId}/questions`

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
  }, [attemptId, testId, isSignedIn])

  return {
    questions,
    setQuestions,
    handleAnswerSelect,
    isPending: (questionId: string) => pendingSync.has(questionId),
    isSynced: (questionId: string) => !pendingSync.has(questionId),
    fetchQuestions // Export this
  }
}