// hooks/useAttemptState.ts

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface UseAttemptStateProps {
  isSignedIn: boolean
  attemptId: string
}

interface AnswerCache {
  [questionId: string]: {
    selectedOptionId: string
    timestamp: number
    synced: boolean
  }
}

type AttemptQuestion = TestAttemptQuestion | GuestAttemptQuestion;

export function useAttemptState({ isSignedIn, attemptId }: UseAttemptStateProps) {
  const [questions, setQuestions] = useState<AttemptQuestion[]>([])
  const [answerCache, setAnswerCache] = useState<AnswerCache>({})
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

      // Update cache
      setAnswerCache(prev => ({
        ...prev,
        [questionId]: {
          selectedOptionId: optionId,
          timestamp: Date.now(),
          synced: false
        }
      }))

      setPendingSync(prev => new Set(prev).add(questionId))

      // API call
      const endpoint = isSignedIn 
        ? `/api/tests/attempt/${attemptId}/questions`
        : `/api/tests/guest/attempt/${attemptId}/questions`

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, selectedOptionId: optionId })
      })

      if (!response.ok) throw new Error('Failed to save answer')

      // Update sync status
      setAnswerCache(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          synced: true
        }
      }))

      setPendingSync(prev => {
        const next = new Set(prev)
        next.delete(questionId)
        return next
      })

    } catch (error) {
      // Rollback on error
      setQuestions(prev => prev.map(q => {
        const isTarget = 'questionId' in q ? 
          q.questionId === questionId :
          q.id === questionId

        if (isTarget && '_optimistic' in q) {
          const cached = answerCache[questionId]
          return {
            ...q,
            selectedOptionId: cached?.selectedOptionId || null,
            isAnswered: !!cached?.selectedOptionId,
            _optimistic: false
          } as AttemptQuestion
        }
        return q
      }))

      toast.error('Failed to save answer. Please try again.')
      console.error('Answer selection error:', error)
    }
  }, [isSignedIn, attemptId, answerCache])

  return {
    questions,
    setQuestions,
    handleAnswerSelect,
    isPending: (questionId: string) => pendingSync.has(questionId),
    isSynced: (questionId: string) => answerCache[questionId]?.synced ?? false
  }
}