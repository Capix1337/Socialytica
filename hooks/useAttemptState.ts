// hooks/useAttemptState.ts

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { attemptStorage } from '@/lib/storage/attempt-storage'
import { syncManager } from '@/lib/sync/sync-manager'
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface UseAttemptStateProps {
  attemptId: string
}

type AttemptQuestion = TestAttemptQuestion | GuestAttemptQuestion;

export function useAttemptState({ attemptId }: UseAttemptStateProps) {
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
    try {
      const response = await fetch(`/api/tests/attempt/${attemptId}/questions`)
      if (!response.ok) throw new Error('Failed to fetch questions')
      const data = await response.json()
      setQuestions(data.questions)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }, [attemptId])

  return {
    questions,
    setQuestions,
    handleAnswerSelect,
    isPending: (questionId: string) => pendingSync.has(questionId),
    isSynced: (questionId: string) => !pendingSync.has(questionId),
    fetchQuestions // Export this
  }
}