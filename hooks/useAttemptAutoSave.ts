// hooks/useAttemptAutoSave.ts

import { useState, useEffect, useCallback } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { attemptStorage } from '@/lib/storage/attempt-storage'
import type { TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import type { GuestAttemptQuestion } from "@/types/tests/guest-attempt"

interface Answer {
  questionId: string
  selectedOptionId: string
  timestamp: number
}

export function useAttemptAutoSave(
  attemptId: string,
  questions: (TestAttemptQuestion | GuestAttemptQuestion)[]
) {
  const [pendingChanges, setPendingChanges] = useState<Answer[]>([])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Sync changes to storage
  const syncChanges = useCallback(async () => {
    if (pendingChanges.length === 0 || isSaving) return
    
    try {
      setIsSaving(true)
      await attemptStorage.saveAnswers(attemptId, questions)
      setLastSaved(new Date())
      setPendingChanges([])
    } catch (error) {
      console.error('Failed to sync changes:', error)
    } finally {
      setIsSaving(false)
    }
  }, [attemptId, questions, pendingChanges, isSaving])

  // Auto-save when we have enough pending changes
  useEffect(() => {
    if (pendingChanges.length >= 5) {
      syncChanges()
    }
  }, [pendingChanges, syncChanges])

  // Auto-save on idle
  useIdleTimer({
    timeout: 30000, // 30 seconds
    onIdle: syncChanges,
    debounce: 500
  })

  const addChange = useCallback((questionId: string, selectedOptionId: string) => {
    setPendingChanges(prev => [
      ...prev,
      {
        questionId,
        selectedOptionId,
        timestamp: Date.now()
      }
    ])
  }, [])

  // Manual save function
  const handleSaveDraft = useCallback(async () => {
    try {
      await syncChanges()
      return true
    } catch (error) {
      console.error('Failed to save draft:', error)
      return false
    }
  }, [syncChanges])

  return {
    addChange,
    handleSaveDraft,
    pendingChanges: pendingChanges.length,
    lastSaved,
    isSaving
  }
}